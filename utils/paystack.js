const https = require('https')


export const verifyPaystackTx = (reference) => {
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/transaction/verify/${reference}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
      
      https.request(options, res => {
        let data = ''
      
        res.on('data', (chunk) => {
          data += chunk
        });
      
        res.on('end', () => {
          return [true, JSON.parse(data)]
        })
      }).on('error', error => {
        console.error(error)
        return [false, error]
      })
}