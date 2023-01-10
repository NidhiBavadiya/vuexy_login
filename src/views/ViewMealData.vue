<template>
  <div class="d-flex justify-content-center ">
    <b-card class="w-50 shadow-lg my-3 py-2">
      <b-card-text class="text-center h1">Meal Data</b-card-text>
      <b-img
        src="../assets/r.jpeg"
        class="w-100"
        img-alt="center-Image"
      ></b-img>
      <b-row class="mt-5 justify-content-center">
        <b-col cols="12" >
            <div class="d-flex">
            <div>
            <feather-icon
            class="ml-1 cursor-pointer #7367f0"
            icon="HomeIcon"
            size="25"
            color="#7367f0"
          />
        </div>
        <div class="ml-1">
        <h3>Restaurant Name</h3>
        <p>{{ view.restaurant_name }}</p> 
        </div>
    </div>
            
        </b-col>
      </b-row>
      <!--  -->
      <b-row class="mt-3">
        <b-col cols="12" md="4">
          <h4>Description</h4>
          <p>{{ view.description }}</p>
        </b-col>
        <b-col cols="12" md="4">
          <h4>Type</h4>
          <p>{{ view.type }}</p>
        </b-col>
        <b-col cols="12" md="4">
          <h4>Margin</h4>
          <p>{{ view.margin }}</p>
        </b-col>
      </b-row>
      <!--  -->
      <b-row class="mt-5 ">
        <b-col cols="12" md="3">
          <h5>USD Price</h5>
          <p>{{ view.USD_price }}</p>
          </b-col>
          <b-col cols="12" md="3">
          <h5>USD Cost</h5>
          <p>{{ view.USD_cost }}</p>
          </b-col>
          <b-col cols="12" md="3">
          <h5>AED Price</h5>
          <p>{{ view.AED_price }}</p>
          </b-col>
          <b-col cols="12" md="3">
          <h5>AED Cost</h5>
          <p>{{ view.AED_cost }}</p>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardText, BRow, BCol, BImg } from "bootstrap-vue";

export default {
  components: {
    BCard,
    BCardText,
    BRow,
    BCol,
    BImg,
  },
  data() {
    return {
      view: [],
    };
  },
  mounted() {
    let id = this.$route.params.id;
    //   get data for view (get API)
    this.axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.token;
    this.axios
      .get("meal/get/" + id)
      .then((response) => {
        console.log("response_view", response.data.data.meal);
        let viewValue = response.data.data.meal;
        console.log("viewValue", viewValue);
        this.view = viewValue;
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
  },
};
</script>

<style>
</style>