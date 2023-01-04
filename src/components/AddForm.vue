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
          <h5 class="mb-0">Add Meals</h5>

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
              <b-col cols="12" md="6">
                <b-form-group label=" Restaurant Name*" label-for="username">
                  <b-form-input id="username" v-model="restaurant_Name" />
                </b-form-group>
              </b-col>

              <!-- Field: Type -->
              <b-col cols="12" md="6">
                <b-form-group label="Type" label-for="Type">
                  <b-form-input id="Type" v-model="type" />
                </b-form-group>
              </b-col>
              <!--  -->
              <!-- <b-col cols="12" md="4">
                <b-form-group label="Status" label-for="type">
                  <v-select
                    v-model="Type"
                    :options="type"
                    input-id="type"
                  />
                </b-form-group>
              </b-col> -->
              <!--  -->

              <!-- Field: Description -->
              <b-col cols="12" md="6">
                <b-form-group label="Description" label-for="username">
                  <b-form-input id="username" v-model="description" :value="description" />
                </b-form-group>
              </b-col>
              <!-- Field: Option -->
              <b-col cols="12" md="6">
                <b-form-group label="Option" label-for="username">
                  <b-form-input id="username" v-model="option" />
                </b-form-group>
              </b-col>

              <!-- Field: Cost AED(Per Person/Day)* -->
              <b-col cols="12" md="4">
                <b-form-group
                  label="Cost AED(Per Person/Day)*"
                  label-for="username"
                >
                  <b-form-input id="username" v-model="costAED" />
                </b-form-group>
              </b-col>

              <!-- Field: Cost USD(Per Person/Day)* -->
              <b-col cols="12" md="4">
                <b-form-group
                  label="Cost USD(Per Person/Day)"
                  label-for="full-name"
                >
                  <b-form-input id="full-name" v-model="costUSD" />
                </b-form-group>
              </b-col>

              <!-- Field: Cost Unit* -->
              <b-col cols="12" md="4">
                <b-form-group label="Cost Unit*" label-for="email">
                  <b-form-input id="email" type="email" v-model="costUnit" />
                </b-form-group>
              </b-col>

              <!-- Field: Margin* -->
              <b-col cols="12" md="4">
                <b-form-group label="Margin*" label-for="full-name">
                  <b-form-input id="full-name" v-model="margin" />
                </b-form-group>
              </b-col>

              <!-- Field: Price Unit* -->
              <b-col cols="12" md="4">
                <b-form-group label=" Price Unit*" label-for="full-name">
                  <b-form-input id="full-name" v-model="priceUnit" />
                </b-form-group>
              </b-col>

              <!-- Field: Price USD(Per Person/Day)* -->
              <b-col cols="12" md="4">
                <b-form-group
                  label="Price USD(Per Person/Day)*"
                  label-for="company"
                >
                  <b-form-input id="company" v-model="priceUSD" />
                </b-form-group>
              </b-col>

              <!-- Field: Price AED(Per Person/Day)* -->
              <b-col cols="12" md="4">
                <b-form-group
                  label=" Price AED(Per Person/Day)*"
                  label-for="username"
                >
                  <b-form-input id="username" v-model="priceAED" />
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
          <!-- Field: button -->
          <b-row>
            <b-col>
              <b-button variant="primary" type="submit" @click="AddValue()">
                <span class="text-nowrap">Meals</span>
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
} from "bootstrap-vue";
import vSelect from 'vue-select'
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
    vSelect
  },
  props: ["items"],
  data() {
    return {
      restaurant_Name: "",
      type: "",
      description: "",
      option: "",
      costAED: "",
      costUSD: "",
      costUnit: "",
      margin: "",
      priceUnit: "",
      priceUSD: "",
      priceAED: "",
      id: "",

      formcard: true,
      // type:['lunch','dinner']
    };
  },
  props: {
    // items: String,
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    AddValue: function () {
      let mealvalue = {
        restaurant_name: this.restaurant_Name,
        type: this.type,
        description: this.description,
        option: this.option,
        AED_cost: this.costAED,
        USD_cost: this.costUSD,
        cost_unit: this.costUnit,
        margin: this.margin,
        priceUnit: this.priceUnit,
        USD_price: this.priceUSD,
        AED_price: this.priceAED,
        id: this.id,
      };
      console.log(mealvalue);
      this.items.push(mealvalue);
      this.$emit("closeSidebar");
    },
    submit() {
      this.$emit("closeSidebar");
    },
  },
};
</script>

<style>
</style>