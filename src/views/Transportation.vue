<template>
  <div>
    <addEditTranspotation
      :isActive="SidebarForm"
      :gettransport="gettransport"
      @closeSidebar="SidebarForm = !SidebarForm"
      :formHeading="heading"
      :f_btn="btnTitle"
      @load="listTransportation"
    ></addEditTranspotation>
    <!-- transportation table -->
    <b-card-code>


      <div class="m-2">
        <b-row>
          <b-col cols="3">
            <h3 class="mt-1">transportation list</h3>
          </b-col>
          <b-col cols="9">
            <div class="d-flex align-items-center justify-content-end">
              <!-- button for Add transportation  -->
              <b-button variant="primary">
                <span class="text-nowrap" @click="openform()">Add Meals</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table responsive :items="transportations" :fields="fields">
        <template #cell(action)="data">
          <!-- button for Edit transportation -->
          <feather-icon
            class="cursor-pointer text-success"
            icon="EditIcon"
            size="16"
            @click="editTransportation(data.item.id)"
          />
          <!-- button For Delete transportation -->
          <feather-icon
            class="ml-1 cursor-pointer text-danger"
            icon="Trash2Icon"
            size="16"
            @click="deleteTransportation(data.item.id)"
          />
          <feather-icon
            class="ml-1 cursor-pointer text-danger"
            icon="EyeIcon"
            size="16"
            @click="viewTransportation(data.item.id)"
          />
        </template>
      </b-table>
    </b-card-code>
  </div>
</template>
<script>
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import { BTable ,BRow ,BCol,BButton } from "bootstrap-vue";
import AddEditTranspotation from "@/components/AddEditTranspotation.vue";

export default {
  components: {
    BCardCode,
    BTable,
    BRow,
    BCol,
    BButton,
    AddEditTranspotation,
  },
  data() {
    return {
      transportations: [],
      fields: [
        {
          key: "action",
          value: "Action",
        },
        {
          key: "provider",
          value: "PROVIDER",
        },
        {
          key: "type",
          value: "TYPE",
        },
        {
          key: "pax_capacity",
          value: "PAX CAPACITY",
        },
        {
          key: "pax_combination",
          value: "PAX COMBINATION",
        },
        {
          key: "total_buses",
          value: "TOTAL BUSES",
        },
        {
          key: "AED_cost",
          value: "AED COST",
        },
        {
          key: "USD_cost",
          value: "USD COST",
        },
        {
          key: "cost_unit",
          value: "COST UNIT",
        },
        {
          key: "margin",
          value: "MARGIN",
        },
        {
          key: "USD_price",
          value: "USD PRICE",
        },
        {
          key: "AED_price",
          value: "AED PRICE",
        },
        // {
        //     key:"id",
        //     value:"id"
        // },
        // {
        //     key:"option",
        //     value:"OPTION"
        // },
      ],
      SidebarForm: false,
      gettransport: [],
      heading: null,
      btnTitle: null,
    };
  },
  mounted() {
    this.listTransportation();
  },
  methods: {
    //list transportation API
    listTransportation() {
      console.log(this.token);
      // POST request using axios with error handling
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.token;
      this.axios
        .post("transportation/list")
        .then((response) => {
          // console.log("hello", response);
          console.log(
            "transportation_data",
            response.data.data.transportations
          );
          this.transportations = response.data.data.transportations;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    //delete transportation API
    deleteTransportation(index) {
      console.log(index);
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.token;
      this.axios
        .post("transportation/delete", { id: index })
        .then((response) => {
          console.log(
            "response_delete_data",
            response.data.data.transportations
          );
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      this.listTransportation();
    },

    //get edit transportation API
    editTransportation(id) {
      this.SidebarForm = !this.SidebarForm;
      this.heading = "Edit Detail"
      this.btnTitle = "Edit"
      console.log(this.token);
      // POST request using axios with error handling
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.token;
      this.axios
        .get("transportation/get/" + id)
        .then((response) => {
          console.log("hello", response);
          console.log(
            "transportation_edit_data",
            response.data.data.transportation
          );
          this.gettransport = response.data.data.transportation;
          console.log("gettransport", this.gettransport);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    //form open function
    openform() {
      this.SidebarForm = !this.SidebarForm;
      this.heading = "Add Detail";
      this.btnTitle = "Add"
    },
    viewTransportation(id){
      this.$router.push('/transportation/' + id)
    }
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
  