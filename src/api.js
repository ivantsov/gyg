import request from 'superagent';

export default async function () {
    try {
        const res = await request('https://www.getyourguide.com/touring.json?key=2Gr0p7z96D');
        return res.body;
    }
    catch (err) {
        console.error(err);
    }
}
