<script>
export default {
    mounted(){
        const rtspStream = require('node-rtsp-stream');

        var ip_address = "192.168.1.1"

        var username = "admin";
        var password= "";

        stream = new rtspStream({
            streamUrl: 'rtsp://' + username + ':' + password + '@' + ip_address +'/live/ch00_0',
            wsPort: 5174
        });
    }
}
</script>