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
            @click="Mealcancel"
          />
        </div>

        <b-card>
          <validation-observer
            #default="{ handleSubmit }"
            ref="refFormObserver"
          >
            <!-- form -->
            <b-form ref="clearform" @submit.prevent="handleSubmit(submit)" >
              <b-row>
                <!-- Field: Restaurant Name* -->
                <b-col cols="12">
                  <validation-provider #default="{ errors }" name="restaurantname" rules="required|max:50">
                   
                    <b-form-group
                      label=" Restaurant Name*"
                      label-for="restaurantname"
                    >
                      <b-form-input
                        id="restaurantname"
                        value="restaurantname"
                        v-model="restaurant_Name"
                        placeholder="Restaurant Name"
                        :state="errors.length > 0 ? false:null" 
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Type -->

                <!--select box  -->
                <b-col cols="12">
                  <validation-provider #default="{ errors }" name="Type" rules="required">
                  <b-form-group label="Type" label-for="Type">
                    <v-select
                      v-model="type"
                      placeholder="type"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="statusOptions"
                      :reduce="(val) => val.value"
                      :clearable="false"
                      input-id="Type"
                      
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                  </validation-provider>
                </b-col>
                <!--  -->
                <!-- Field: Description -->
                <b-col cols="12">
                  <validation-provider #default="{ errors }" name="Description" rules="required|max:500">
                  <b-form-group label="Description" label-for="Description">
                    <b-form-input
                    type="text"
                      id="Description"
                      placeholder="Description"
                      v-model="description"
                      :value="description"
                   
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Cost AED(Per Person/Day)* -->
                <b-col cols="12">
                  <validation-provider #default="{ errors }" name="AEDcost" rules="required|positive">
                  <b-form-group
                    label="Cost AED(Per Person/Day)*"
                    label-for="AEDcost"
                  >
                    <b-form-input
                     
                      id="AEDcost"
                      v-model="costAED"
                      placeholder=" Cost AED"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Cost USD(Per Person/Day)* -->
                <b-col cols="12">
                  <validation-provider #default="{ errors }" name="USDcost" rules="required|positive">
                  <b-form-group
                    label="Cost USD(Per Person/Day)"
                    label-for="USDcost"
                  >
                    <b-form-input
                    
                      id="USDcost"
                      v-model="costUSD"
                      placeholder="Cost USD"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Cost Unit* -->
                <b-col cols="12" md="6">
                  <validation-provider #default="{ errors }" name="costunit" rules="required">
                  <b-form-group label="Cost Unit*" label-for="costunit">
                    <b-form-input
                      id="costunit"
                      type="text"
                      v-model="costUnit"
                      placeholder=" Cost Unit"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Margin* -->
                <b-col cols="12" md="6">
                  <validation-provider #default="{ errors }" name="margin" rules="required|positive">
                  <b-form-group label="Margin*" label-for="margin">
                    <b-form-input
                  
                      id="margin"
                      v-model="margin"
                      placeholder=" Margin"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Price USD(Per Person/Day)* -->
                <b-col cols="12">
                  <validation-provider #default="{ errors }" name="priceUSD" rules="required|positive">
                  <b-form-group
                    label="Price USD(Per Person/Day)*"
                    label-for="priceUSD"
                  >
                    <b-form-input
                      id="priceUSD"
                      v-model="priceUSD"
                      placeholder="Price USD"
                    
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Field: Price AED(Per Person/Day)* -->
                <b-col cols="12">
                  <validation-provider #default="{ errors }" name="priceAED" rules="required|min_value:0">
                  <b-form-group
                    label=" Price AED(Per Person/Day)*"
                    label-for="priceAED"
                  >
                    <b-form-input
                      type="number"
                      min="0"
                      id="priceAED"
                      v-model="priceAED"
                      placeholder="Price AED"
                    />
                    <!-- numeric -->
                    <small class="text-danger">{{ errors[0] }}</small>
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
                    v-if="id"
                    @click="submit(EditedMealValue())"
                  >
                  <!--  -->
                    <span class="text-nowrap">Edit Meal</span>
                  </b-button>
                  <b-button
                    variant="primary"
                    type="submit"
                    id="addMeal"
                    v-else
                    @click="submit(AddMealValue())"
                  >
                  <!--   -->
                    <span class="text-nowrap">Add Meal</span>
                  </b-button>

                  <b-button
                    variant="primary"
                    @click="Mealcancel()" 
                    class="ml-2"
                  >
                  <!-- mealcancle replace with hide -->
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
import { required, max,min_value , positive } from "@validations";
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
      restaurant_Name: "",
      type: "",
      description: "",
      costAED: "",
      costUSD: "",
      costUnit: "",
      margin: "",
      priceUSD: "",
      priceAED: "",
      id: null,

      formcard: true,
      selected: null,
      EditButton: false,
      Addbutton: true,
      statusOptions: [
        { label: "breakfast", value: "breakfast" },
        { label: "lunch", value: "lunch" },
        { label: "dinner", value: "dinner" },
      ],
      required,max,positive,min_value
    };
  },
  props: {
    items: Array,
    isActive: {
      type: Boolean,
      required: true,
    },
    formHeading: String,
    geteditvalue: {
      default: null,
    },
  },
  watch: {
    geteditvalue(val) {
      if (val) {
        this.id = val.id;
        (this.restaurant_Name = val.restaurant_name),
          (this.type = val.type),
          (this.description = val.description),
          (this.costAED = val.AED_cost),
          (this.costUSD = val.USD_cost),
          (this.costUnit = val.cost_unit),
          (this.priceUSD = val.USD_price),
          (this.priceAED = val.AED_price),
          (this.margin = val.margin);
      } else {
        this.id = null;
        this.restaurant_Name = null;
        this.type = null;
        this.description = null;
        this.costAED = null;
        this.costUSD = null;
        this.costUnit = null;
        this.priceUSD = null;
        this.priceAED = null;
        this.margin = null;
      }
    },
  },
  methods: {
    //add Meal  value API
    AddMealValue() {
      // POST request using axios with error handling
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.token;
      console.log("valid", this.token);
      let mealvalue = {
        restaurant_name: this.restaurant_Name,
        type: this.type,
        description: this.description,
        AED_cost: this.costAED,
        USD_cost: this.costUSD,
        cost_unit: this.costUnit,
        margin: this.margin,
        USD_price: this.priceUSD,
        AED_price: this.priceAED,
        id: this.id,
      };
      console.log(mealvalue);
      this.axios
        .post("meal/create", mealvalue)
        .then((response) => {
          console.log("response.data", response.data.data.meal);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      this.$emit("loadData");
      this.$emit("closeSidebar");
    },
    //edit button call update API
    EditedMealValue() {
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.token;
      console.log("edit_valid_token", this.token);

      let mealUpdate = {
        restaurant_name: this.restaurant_Name,
        type: this.type,
        description: this.description,
        AED_cost: this.costAED,
        USD_cost: this.costUSD,
        cost_unit: this.costUnit,
        margin: this.margin,
        USD_price: this.priceUSD,
        AED_price: this.priceAED,
        id: this.id,
      };
      this.axios
        .post("meal/update", mealUpdate)
        .then((response) => {
          console.log("response_edit_data", response);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      this.$emit("loadData");
      this.$emit("closeSidebar");
    },
    //cancel Meal
    Mealcancel(){
        this.$refs.clearform.reset(); 
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