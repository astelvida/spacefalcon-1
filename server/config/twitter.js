const twitter = {
  consumer_key:         'PbfgGoSHba3DWxY4kpT8Lztu1',
  consumer_secret:      'F6wVQ3xIfZXngTcZwvfT40HMZ4Q8K8RgdB3Q2YhuBwJJUqVevt',
  access_token:         '812385770484822016-YYML4Fa7afJT7tt7lgCv6j6hx88W52R',
  access_token_secret:  '6LtmeVQ9qdVPeFR19kBun1uGXbwcPJVW9eszpwmameCX5'
}
const _ = require('underscore');
const Twit  = require('twit');
const T = new Twit(twitter);
const options = { 
	screen_name: 'hackreactor',
	include_rts: false,
  count: 100 
}

const getTwitterFeed = () => {
   return new Promise ((res, rej)=>{
    T.get('statuses/user_timeline', options, (err, feed) => {
			if (err) { 
        rej(err);
      } else {
        const twitterFeed = _.pluck(feed, 'text').join()
        res(twitterFeed);
      }
		})
   })
 }

module.exports = getTwitterFeed;