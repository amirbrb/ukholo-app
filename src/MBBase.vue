<script>
import $ from 'jquery';
import moment from 'moment';
import ApplicationConfiguration from './config/applicationConfiguration.js'

export default {
  data() {
  	return {
		  domain: ApplicationConfiguration.baseDomain,
      imagesDomain: ApplicationConfiguration.imagesDomain,
      userData: this.$parent.userData,
      currentLocation: this.$parent.currentLocation
  	}
  },
  methods:{
    userSettingsChanged (preferences, userId){
      var url = '/users/' + userId + '/preferences';
        var data = {
          preferences: JSON.stringify(preferences),
          userId: userId
        };
        $.post(url, data);
    },
    log(message){
		  alert(message.message);
    },  
    stringifyDate(dateObject, format){
      format = format || 'DD-MMM-YYYY HH:mm:ss';
      return moment(dateObject).format(format);
    }
  }
}

</script>
