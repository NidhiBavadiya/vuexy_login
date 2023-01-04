import Vue from 'vue'

const myMixin=Vue.mixin({
    data() {
        return {
            token: null,
        }
    },
    mounted() {
        let obj = JSON.parse(localStorage.getItem('token'));
        this.token = obj.token;
    }
})