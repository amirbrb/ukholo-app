import axios from 'axios'
export const HTTP = axios.create({
	baseURL: 'https://mustb-amirbrb.c9users.io',
 	data: {
    	tokenKey: localStorage.mb_token
  	},
  	params: {
    	tokenKey: localStorage.mb_token
  	}
})