 <template>
  <div>
    <!-- open form component for Add-Edit Meal -->
    <addEditMeal
      :isActive="SideForm"
      :items="items"
      @closeSidebar="SideForm = !SideForm"
      :formHeading="heading"
      :geteditvalue="geteditvalue"
      @loadData="ListMeal"
    ></addEditMeal>

    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col cols="3">
            <h3 class="mt-1">Meal Listing</h3>
          </b-col>
          <b-col cols="9">
            <div class="d-flex align-items-center justify-content-end">
              <!-- button for Add meal -->
              <b-button variant="primary">
                <span class="text-nowrap" @click="openform()">Add Meals</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table :items="items" :fields="fields" responsive>
        <template #cell(actions)="data">
          <!-- button for Edit Meal -->
          <feather-icon
            class="cursor-pointer text-success"
            icon="EditIcon"
            size="16"
            @click="EditMeal(data.item.id)"
          />
          <!-- button For Delete Meal -->
          <feather-icon
            class="ml-1 cursor-pointer text-danger"
            icon="Trash2Icon"
            size="16"
            @click="deleteMeal(data.item.id)"
          />
          <feather-icon
            class="ml-1 cursor-pointer text-danger"
            icon="EyeIcon"
            size="16"
            @click="viewMealData(data.item.id)"
          />
        </template>
      </b-table>
    </b-card>
  </div>
</template>
<script>
import { BCard, BRow, BCol, BFormInput, BButton, BTable } from "bootstrap-vue";
import AddEditMeal from "../components/AddEditMeal.vue";
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,

    AddEditMeal,
  },
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: "Actions",
          stickyColumn: true,
        },
        {
          key: "restaurant_name",
          label: "Restaurant Name",
          stickyColumn: true,
        },
        {
          key: "type",
          label: "Type",
        },
        {
          key: "AED_cost",
          label: "AED_cost",
        },
        {
          key: "USD_cost",
          label: " usd_cost",
        },
        {
          key: "cost_unit",
          label: "Cost_Unit",
        },
        {
          key: "USD_price",
          label: "USD_price",
        },
        {
          key: "AED_price",
          label: "AED_price",
        },
        {
          key: "description",
          label: "Description",
        },
        {
          key: "margin",
          label: "Margin",
        },
      ],
      items: [],
      SideForm: false,
      heading: null,
      btnname: null,
      geteditvalue: [],
    };
  },

  mounted() {
    this.ListMeal();
  },

  methods: {
    //table list API ....
    ListMeal() {
      console.log(this.token);
      // POST request using axios with error handling
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.token;
      this.axios
        .post("meal/list")
        .then((response) => {
          console.log("response_list_data", response.data.data.meals);
          this.items = response.data.data.meals;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    //delete row API...
    deleteMeal(index) {
      console.log(index);
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.token;
      this.axios
        .post("meal/delete", { id: index })
        .then((response) => {
          console.log("response_delete_data", response.data.data.meals);
          this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Delete Successfully',
                  icon: 'Trash2Icon',
                  variant: 'danger',
                },
              })
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      this.ListMeal();
    },

    //get EditMeal Data API...
    EditMeal(id) {
      this.SideForm = !this.SideForm;
      this.heading = "Edit Meals";
      console.log("edit-id", id);
      //get data for edit (get API)
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.token;
      this.axios
        .get("meal/get/" + id)
        .then((response) => {
          this.geteditvalue = response.data.data.meal;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    //add meals form open function
    openform() {
      this.geteditvalue = null;
      this.SideForm = !this.SideForm;
      this.heading = "Add Meals";
      this.btnname = "Meals";
    },

    viewMealData(id) {
      this.$router.push({
        path: "/viewmealdata/"+id,
      });
    },
  },
};
</script>
