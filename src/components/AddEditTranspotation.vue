<template>
  <div>
    <b-sidebar
      id="add-new-user-sidebar"
      :visible="isActive"
      bg-variant="white"
      sidebar-class="sidebar-lg"
      no-header
      right
      backdrop
    >
      <template #default>
        <div
          class="
            d-flex
            justify-content-between
            align-items-center
            content-sidebar-header
            px-2
            py-1
          "
        >
          <h5 class="mb-0">{{ formHeading }}</h5>

          <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="closeForm()"
          />
        </div>

        <b-card>
          <validation-observer
            #default="{ handleSubmit }"
            ref="refFormObserver"
          >
            <!-- form -->
            <b-form ref="clearform" @submit.prevent="handleSubmit(submit)">
              <b-row>
                <!-- Field: Provider* -->
                <b-col cols="12">
                  <validation-provider
                    #default="{ errors }"
                    name="provider"
                    rules="required|max:50"
                  >
                    <b-form-group label=" Provider*" label-for="provider">
                      <b-form-input
                        type="text"
                        id="provider"
                        value="provider"
                        v-model="blog.provider"
                        placeholder="provider"
                        :state="errors.length > 0 ? false : null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Type -->
                <b-col cols="12">
                  <validation-provider
                    #default="{ errors }"
                    name="Type"
                    rules="required"
                  >
                    <b-form-group label="Type" label-for="Type">
                      <v-select
                        v-model="blog.type"
                        placeholder="type"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :reduce="(val) => val.value"
                        :options="statusOptions"
                        :clearable="false"
                        input-id="Type"
                      />
                      
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <!--  -->

                <!-- Field: No of Buses -->
                <b-col cols="12">
                  <validation-provider
                    #default="{ errors }"
                    name="noofbuses"
                    rules="required|positive"
                  >
                    <b-form-group label="No of Buses" label-for="noofbuses">
                      <b-form-input
                        type="number"
                        id="noofbuses"
                        placeholder="noofbuses"
                        v-model="blog.total_buses"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Pax Capacity -->
                <b-col cols="12">
                  <validation-provider
                    #default="{ errors }"
                    name="paxcapacity"
                    rules="required|positive"
                  >
                    <b-form-group label="Pax Capacity" label-for="paxcapacity">
                      <b-form-input
                        type="number"
                        id="paxcapacity"
                        placeholder="paxcapacity"
                        v-model="blog.pax_capacity"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Pax Combination -->
                <b-col cols="12">
                  <validation-provider
                    #default="{ errors }"
                    name="pax_combination"
                    rules="required||positive"
                  >
                    <b-form-group
                      label="Pax Combination"
                      label-for="pax_combination"
                    >
                      <b-form-input
                        type="number"
                        id="pax_combination"
                        placeholder="pax_combination"
                        v-model="blog.pax_combination"
                        :value="pax_combination"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Cost AED(Per Person/Day)* -->
                <b-col cols="12">
                  <validation-provider
                    #default="{ errors }"
                    name="AEDcost"
                    rules="required|positive"
                  >
                    <b-form-group
                      label="Cost AED(Per Person/Day)*"
                      label-for="AEDcost"
                    >
                      <b-form-input
                        id="AEDcost"
                        type="number"
                        v-model="blog.AED_cost"
                        placeholder=" Cost AED"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Cost USD(Per Person/Day)* -->
                <b-col cols="12">
                  <validation-provider
                    #default="{ errors }"
                    name="USDcost"
                    rules="required|positive"
                  >
                    <b-form-group
                      label="Cost USD(Per Person/Day)"
                      label-for="USDcost"
                    >
                      <b-form-input
                        id="USDcost"
                        type="number"
                        v-model="blog.USD_cost"
                        placeholder="Cost USD"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Cost Unit* -->
                <b-col cols="12" md="6">
                  <validation-provider
                    #default="{ errors }"
                    name="costunit"
                    rules="required"
                  >
                    <b-form-group label="Cost Unit*" label-for="costunit">
                      <b-form-input
                        id="costunit"
                        type="text"
                        v-model="blog.cost_unit"
                        placeholder=" Cost Unit"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Margin* -->
                <b-col cols="12" md="6">
                  <validation-provider
                    #default="{ errors }"
                    name="margin"
                    rules="required|positive"
                  >
                    <b-form-group label="Margin*" label-for="margin">
                      <b-form-input
                        type="number"
                        id="margin"
                        v-model="blog.margin"
                        placeholder=" Margin"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Price USD(Per Person/Day)* -->
                <b-col cols="12">
                  <validation-provider
                    #default="{ errors }"
                    name="priceUSD"
                    rules="required|positive"
                  >
                    <b-form-group
                      label="Price USD(Per Person/Day)*"
                      label-for="priceUSD"
                    >
                      <b-form-input
                        id="priceUSD"
                        type="number"
                        v-model="blog.USD_price"
                        placeholder="Price USD"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Price AED(Per Person/Day)* -->
                <b-col cols="12">
                  <validation-provider
                    #default="{ errors }"
                    name="priceAED"
                    rules="required|min_value:0|positive"
                  >
                    <b-form-group
                      label=" Price AED(Per Person/Day)*"
                      label-for="priceAED"
                    >
                      <b-form-input
                        type="number"
                        min="0"
                        id="priceAED"
                        v-model="blog.AED_price"
                        placeholder="Price AED"
                      />
                      <!--value consider flote value numeric -->
                      <small class="text-danger">{{ errors[0]}}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>

              <!-- Field: button -->
              <b-row>
                <b-col>
                  <b-button
                    variant="primary"
                    type="submit"
                    v-if="blog.id"
                    @click="submit(editTransport())"
                  >
                    <span class="text-nowrap">Edit</span>
                  </b-button>

                  <b-button
                    variant="primary"
                    type="submit"
                    id="addMeal"
                    v-else
                    @click="submit(addTransport())"
                  >
                    <span class="text-nowrap">Add</span>
                  </b-button>

                  <b-button variant="primary" @click="closeForm()" class="ml-2">
                    <span class="text-nowrap">cancel</span>
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </b-card>
      </template>
    </b-sidebar>
  </div>
</template>
  
  <script>
import {
  BButton,
  BMedia,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BCard,
  BSidebar,
  // BFormSelect
} from "bootstrap-vue";
import VSelect from "vue-select";
import { required, max, min_value, positive } from "@validations";
import formValidation from "@core/comp-functions/forms/form-validation";
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BCard,
    BSidebar,
    VSelect,

    // Form Validation
    ValidationProvider,
    ValidationObserver,

    formValidation,
  },

  data() {
    return {
      blog: {
        provider: "",
        type: "",
        pax_capacity: "",
        pax_combination:"",
        total_buses:"",
        AED_cost: "",
        USD_cost: "",
        cost_unit: "",
        margin: "",
        USD_price: "",
        AED_price: "",
        id: null,
      },

      formcard: true,
      selected: null,
      EditButton: false,
      Addbutton: true,
      statusOptions: [
        { label: "dubai", value: "dubai" },
        { label: "abu dhabi", value: "abudhabi" },
        { label: "arrival transfer", value: "arrivaltransfer" },
        { label: "depart transfer", value: "departtransfer" },
      ],
      required,
      max,
      positive,
      min_value,
    };
  },
  props: {
   items:Array,
    isActive: {
      type: Boolean,
      required: true,
    },
    formHeading: String,
    f_btn: String,
    gettransport: {
    default: null,
    },
  },
 watch:{
  gettransport(value){
    if(value){
      this.blog.id=value.id
      this.blog.provider=value.provider
      this.blog.type=value.type
      this.blog.pax_capacity=value.pax_capacity
      this.blog.pax_combination=value.pax_combination
      this.blog.total_buses=value.total_buses
      this.blog.AED_cost=value.AED_cost
      this.blog.USD_cost=value.USD_cost
      this.blog.cost_unit=value.cost_unit
      this.blog.margin=value.margin
      this.blog.USD_price=value.USD_price
      this.blog.AED_price=value.AED_price
    }
    else{
      this.blog.provider=null
      this.blog.type=null
      this.blog.pax_capacity=null
      this.blog.pax_combination=null
      this.blog.total_buses=null
      this.blog.AED_cost=null
      this.blog.USD_cost=null
      this.blog.cost_unit=null
      this.blog.margin=null
      this.blog.USD_price=null
      this.blog.AED_price=null
      this.blog.id=null 
      }
  }
 },
  methods: {
    //Add transportation API

    addTransport(){
      this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;

      const newtransport = {
        provider: this.blog.provider,
        type: this.blog.type,
        pax_capacity: this.blog.pax_capacity,
        pax_combination:this.blog.pax_combination,
        total_buses:this.blog.total_buses,
        AED_cost: this.blog.AED_cost,
        USD_cost: this.blog.USD_cost,
        cost_unit: this.blog.cost_unit,
        margin: this.blog.margin,
        USD_price: this.blog.USD_price,
        AED_price: this.blog.AED_price,
        id:this.blog.id
      }
      console.log("new transhport",newtransport);
      this.axios.post("transportation/create",newtransport)
        .then((response) => {
          console.log("response",response);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        this.$emit("load");
      },

       //Edit Transportation API
    editTransport(){
        this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;

        const edittransport = {
        provider: this.blog.provider,
        type: this.blog.type,
        pax_capacity: this.blog.pax_capacity,
        pax_combination:this.blog.pax_combination,
        total_buses:this.blog.total_buses,
        AED_cost: this.blog.AED_cost,
        USD_cost: this.blog.USD_cost,
        cost_unit: this.blog.cost_unit,
        margin: this.blog.margin,
        USD_price: this.blog.USD_price,
        AED_price: this.blog.AED_price,
        id : this.blog.id
      }

      console.log("edittransport",edittransport);
      this.axios.post("transportation/update",edittransport)
        .then((response) => {
          console.log("response",response);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        this.$emit("load");
      },

      closeForm(){
        this.SideForm = !this.SideForm;
        this.$emit("closeSidebar");
      },
    submit() {
      this.$emit("closeSidebar");
    },
  },
};
</script>
  
  <style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>