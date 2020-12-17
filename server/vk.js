const fetch = require('node-fetch');

function User(uo, subo, fcnt) {
    this.color = '';
    this.id = uo.id || '-';
    this.name = uo.first_name || '-';
    this.surname = uo.last_name || '-';
    this.sex = ['-', 'Жен.', 'Муж.'][uo.sex];
    this.age = '-';
    this.country = '-'
    this.lastSeen = '-' ;
    this.education = '-';
    this.workExp = '-';
    this.avatar = (typeof(uo.photo_id) === 'undefined') ? 'Нет' : 'Да';
    this.interests = uo.interests || '-';
    this.subscriptions = '-';
    this.friendsCount = fcnt;
    this.subscribersCount = '-';
    this.phone = uo.mobile_phone || uo.home_phone || '-';
    this.email = 'N/A';

    // age
    if (uo.bdate) {
        let darr = uo.bdate.split('.');
        if (darr.length == 3) {
            let d = new Date(darr[2], darr[1], darr[0]);
            let delta = Date.now() - d.getTime();
            let ad = new Date(delta);
            this.age = ad.getUTCFullYear() - 1970;
        }
    }

    // education
    if (uo.university_name) {
        this.education = uo.university_name;
        if(uo.faculty_name)this.education = uo.faculty_name + ', ' + this.education;
        if(uo.graduation)this.education += `, ${uo.graduation}`;
    }

    // last seen
    if (uo.last_seen) {
        let lastDate = new Date(uo.last_seen.time*1000);
        if(Date.now() - uo.last_seen.time*1000 > 1000*60*60*24*365){
            this.color = 'red';
        }
        this.lastSeen = `${lastDate.getDate()}.${lastDate.getMonth()+1}.${lastDate.getFullYear()}`
    }

    // career
    if (uo.career) {
        if(uo.career.length != 0){
            this.workExp = ''
            for (c of uo.career) {
                if (c.position) {
                    this.workExp += c.position + ' '
                }
            }
        }
    }

    if (uo.counters) {
        this.subscribersCount = uo.counters.followers || '-';
    }

    if (subo) {
        subo = subo.filter((elem) => { return elem.type == 'page' });
        if (subo.length > 0) {
            this.subscriptions = '';
            for (sub of subo) {
                this.subscriptions += sub.name + ', '
            }
            this.subscriptions = this.subscriptions.slice(0, this.subscriptions.length - 2);
        }
    }

    if (uo.country) {
        this.country = uo.country.title;
        if (uo.city) this.country += ', ' + uo.city.title
    }

    // color
    if ('deactivated' in uo ||
        this.avatar === 'Нет' || // возможно, имелись в виду все фото, но мне похуй
        this.friendsCount === 0 ||
        this.age < 16 || this.age > 100) {
            this.color = 'red';
        }
    if (uo.is_closed) {
        this.color = 'blue';
    }
    if (!this.color) {
        this.color = 'green';
    }

    for (let field in this) {
        this[field] = this[field].toString();
    }
}

async function getUsers(userIds) {
    const token = 'da0fe931da0fe931da0fe93179da7a815cdda0fda0fe93185dded215bc77fdef79dfbc1';
    const fields = [
        'education',
        'sex',
        'bdate',
        'city',
        'country',
        'last_seen',
        'universities',
        'career',
        'photo_id',
        'interests',
        'counters',
        'contacts'
    ];
    
    let out = [];
    
    for (let id of userIds) {
        const url = `https://api.vk.com/method/users.get?access_token=${token}&v=5.126&user_ids=${id}&fields=${fields.join()}&lang=ru`;
        let req = await fetch(url);
        let res = await req.json();

        let subo = []
        try {
            const subUrl = `https://api.vk.com/method/users.getSubscriptions?access_token=${token}&v=5.126&user_id=${id}&extended=1&lang=ru&count=200`;
            let subjs = (await (await fetch(subUrl)).json())
            subo = subjs.response.items;
        } catch {
        }

        let friendsCnt = '-'
        try {
            const friendsUrl = `https://api.vk.com/method/friends.get?access_token=${token}&v=5.126&user_id=${id}&lang=ru&count=5000`;
            let frjs = (await (await fetch(friendsUrl)).json())
            friendsCnt = frjs.response.count;
        } catch {
        }

        let user = res.response[0];
        // if ('deactivated' in user) continue;
        try {
            out.push(new User(user, subo, friendsCnt));
        } catch {

        }
    }
    
    return out;
}

const MAX_ID = 628295486;

async function getRandomUsers(count) {
    // count = 1
    let res = []
    while (count != 0) {
        let ids = [];
        for (let i = 0; i < count; i++) {
            ids.push(Math.floor(Math.random() * MAX_ID));
        }
        // ids = [145549256]
        let tmp = await getUsers(ids);
        count -= tmp.length;
        res = res.concat(tmp);
    }
    
    return res;
}

module.exports.User = User;
module.exports.getRandomUsers = getRandomUsers;