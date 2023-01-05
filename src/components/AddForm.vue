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
            @click="$emit('closeSidebar')"
          />
        </div>
        <b-card>
          <!-- <b-card> -->
          <b-form>
            <b-row>
              <!-- Field: Restaurant Name* -->
              <b-col cols="12">
                <b-form-group label=" Restaurant Name*" label-for="username">
                  <b-form-input
                    id="username"
                    value="fhnj"
                    v-model="restaurant_Name"
                    placeholder=" Restaurant Name"
                  />
                </b-form-group>
              </b-col>

              <!-- Field: Type -->
              <b-col cols="12">
                <b-form-group label="Type" label-for="Type">
                  <b-form-input id="Type" v-model="type" placeholder="type" />
                </b-form-group>
              </b-col>

              <!-- Field: Description -->
              <b-col cols="12">
                <b-form-group label="Description" label-for="username">
                  <b-form-input
                    id="username"
                    placeholder="Description"
                    v-model="description"
                    :value="description"
                  />
                </b-form-group>
              </b-col>

              <!-- Field: Cost AED(Per Person/Day)* -->
              <b-col cols="12">
                <b-form-group
                  label="Cost AED(Per Person/Day)*"
                  label-for="username"
                >
                  <b-form-input
                    id="username"
                    v-model="costAED"
                    placeholder=" Cost AED"
                  />
                </b-form-group>
              </b-col>

              <!-- Field: Cost USD(Per Person/Day)* -->
              <b-col cols="12">
                <b-form-group
                  label="Cost USD(Per Person/Day)"
                  label-for="full-name"
                >
                  <b-form-input
                    id="full-name"
                    v-model="costUSD"
                    placeholder="Cost USD"
                  />
                </b-form-group>
              </b-col>

              <!-- Field: Cost Unit* -->
              <b-col cols="12" md="6">
                <b-form-group label="Cost Unit*" label-for="email">
                  <b-form-input
                    id="email"
                    type="email"
                    v-model="costUnit"
                    placeholder=" Cost Unit"
                  />
                </b-form-group>
              </b-col>

              <!-- Field: Margin* -->
              <b-col cols="12" md="6">
                <b-form-group label="Margin*" label-for="full-name">
                  <b-form-input
                    id="full-name"
                    v-model="margin"
                    placeholder=" Margin"
                  />
                </b-form-group>
              </b-col>

              <!-- Field: Price USD(Per Person/Day)* -->
              <b-col cols="12">
                <b-form-group
                  label="Price USD(Per Person/Day)*"
                  label-for="company"
                >
                  <b-form-input
                    id="company"
                    v-model="priceUSD"
                    placeholder="Price USD"
                  />
                </b-form-group>
              </b-col>

              <!-- Field: Price AED(Per Person/Day)* -->
              <b-col cols="12">
                <b-form-group
                  label=" Price AED(Per Person/Day)*"
                  label-for="username"
                >
                  <b-form-input
                    id="username"
                    v-model="priceAED"
                    placeholder="Price AED"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
          <!-- Field: button -->
          <b-row>
            <b-col>
              <b-button
                variant="primary"
                type="submit"
                v-if="id"
                @click="EditValue()"
              >
                <span class="text-nowrap">Edit Meal</span>
              </b-button>
              <b-button
                variant="primary"
                type="submit"
                id="addMeal"
                v-else
                @click="AddValue()"
              >
                <span class="text-nowrap">Add Meal</span>
              </b-button>

              <b-button
                variant="primary"
                @click="$emit('closeSidebar')"
                class="ml-2"
              >
                <span class="text-nowrap">cancel</span>
              </b-button>
            </b-col>
          </b-row>
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
    // BFormSelect
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
    };
  },
  props: {
    // items,
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
        console.log("add meals");
      }
    },
  },
  methods: {
    //add value API
    AddValue: function () {
      console.log("hello");
      console.log(this.token);
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

      // window.location.reload()
    },
    //edit button function
    EditValue() {
      console.log("update API");
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

    submit() {
      this.$emit("closeSidebar");
    },
  },
};
</script>


<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>