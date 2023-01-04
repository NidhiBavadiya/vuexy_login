<template>
  <div>
    <addForm v-show="formcard" :items="items"></addForm>
  </div>
</template>

<script>
import AddForm from '../components/AddForm.vue'
export default {
components:{
    AddForm  
}
}
</script>

<style>

</style>