 <template>
  <div>
    <addForm
      :isActive="SideForm"
      :items="items"
      @closeSidebar="SideForm = !SideForm"
      :formHeading="heading"
      :geteditvalue="geteditvalue"
      @loadData="ListApi"
    ></addForm>
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <!-- Search -->
          <b-col cols="12">
            <div class="d-flex align-items-center justify-content-end">
              <!-- <router-link to="/add"> -->
              <b-button variant="primary">
                <span class="text-nowrap" @click="openform()">Add Meals</span>
              </b-button>
              <!-- </router-link> -->
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table ref="refUserListTable" :items="items" :fields="fields">
        <template #cell(actions)="data">
          <!--="data" -->
          <!-- <router-link :to="'/edit/'+ data.item.id">  -->
          <feather-icon
            class="ml-1 cursor-pointer text-success"
            icon="Edit2Icon"
            size="16"
            @click="EditData(data.item.id)"
          />
          <!-- </router-link> -->
          <feather-icon
            class="ml-1 cursor-pointer text-danger"
            icon="Trash2Icon"
            size="16"
            @click="deleteData(data.item.id)"
          />
        </template>
      </b-table>
    </b-card>
  </div>
</template>
<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
} from "bootstrap-vue";
import AddForm from "../components/AddForm.vue";
export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    AddForm,
  },
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: "Actions",
        },
        {
          key: "type",
          label: "Type",
        },
        {
          key: "restaurant_name",
          label: "Restaurant Name",
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
    this.ListApi();
  },

  methods: {
    //table list API ....
    ListApi() {
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
    deleteData(index) {
      console.log(index);
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.token;
      this.axios
        .post("meal/delete", { id: index })
        .then((response) => {
          console.log("response.data", response.data.data.meals);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        this.ListApi();
       
    },
    //Edit Data API...
    EditData(singleMeal) {
      this.SideForm = !this.SideForm;
      this.heading = "Edit Meals";
      console.log("edit", singleMeal);
      let id = singleMeal;
      //get data for edit (get API)
      console.log("Get_Edit_Data");
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.token;
      this.axios
        .get("meal/get/" + id)
        .then((response) => {
          // console.log("response edit data",response.data.data.meal)
          this.geteditvalue = response.data.data.meal;
          // console.log("main Edit value",this.geteditvalue );
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    //add meals form open function
    openform() {
      this.geteditvalue=null;
      this.SideForm = !this.SideForm;
      this.heading = "Add Meals";
      this.btnname = "Meals";
    },
  },
};
</script>
