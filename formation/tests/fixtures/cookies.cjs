module.exports = (url) => ({ name:'pwt-cookie-consent', value:encodeURIComponent(JSON.stringify({version:1,analytics:false,updatedAt:Date.now()})),url,sameSite:'Lax' });
