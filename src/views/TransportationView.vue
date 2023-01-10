<template>
  <div class="d-flex justify-content-center">
    <b-card class="w-50 shadow-lg my-3 py-2">
      <b-card-text class="text-center h1">Transportation Data</b-card-text>
      <b-img
        src="../assets/transportation.jpeg"
        class="w-100"
        img-alt="center-Image"
      ></b-img>
      <b-row class="mt-5 justify-content-center">
        <b-col cols="12" md="6">
          <h3>Provider</h3>
          <p>{{ Transportationview.provider }}</p>
        </b-col>
        <b-col cols="12" md="6">
          <h4>Type</h4>
          <p>{{ Transportationview.type }}</p>
        </b-col>
      </b-row>
      <!--  -->
      <b-row class="mt-2">
        <b-col cols="12" md="6">
          <h4>Pax Capacity</h4>
          <p>{{ Transportationview.pax_capacity }}</p>
        </b-col>
        <b-col cols="12" md="6">
          <h4>Pax Combination</h4>
          <p>{{ Transportationview.pax_combination }}</p>
        </b-col>
        </b-row>
        <!--  -->
        <b-row class="mt-2">
        <b-col cols="12" md="4">
          <h4>Total Buses</h4>
          <p>{{ Transportationview.total_buses }}</p>
        </b-col>
        <b-col cols="12" md="4">
          <h4>margin</h4>
          <p>{{ Transportationview.total_buses }}</p>
        </b-col>
        <b-col cols="12" md="4">
          <h4>Cost Unit</h4>
          <p>{{ Transportationview.cost_unit }}</p>
        </b-col>
      </b-row>
      <!--  -->
      <b-row class="mt-2">
        <b-col cols="12" md="3">
          <h5>USD Price</h5>
          <p>{{ Transportationview.USD_price }}</p>
        </b-col>
        <b-col cols="12" md="3">
          <h5>USD Cost</h5>
          <p>{{ Transportationview.USD_cost }}</p>
        </b-col>
        <b-col cols="12" md="3">
          <h5>AED Price</h5>
          <p>{{ Transportationview.AED_price }}</p>
        </b-col>
        <b-col cols="12" md="3">
          <h5>AED Cost</h5>
          <p>{{ Transportationview.AED_cost }}</p>
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
      Transportationview: [],
    };
  },
  mounted() {
    console.log("getdata");
    let id = this.$route.params.id;
    console.log(this.token);
    // POST request using axios with error handling
    this.axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.token;
    this.axios
      .get("transportation/get/" + id)
      .then((response) => {
        console.log(
          "transportation_view_data",
          response.data.data.transportation
        );
        this.Transportationview = response.data.data.transportation;
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