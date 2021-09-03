<template>
  <v-main>
    <v-card
      class="mx-auto pa-5 ma-2"
      align="center"
      max-width="200px"
      color="rgb(255, 179, 68, 0.4)"
    >
      <h3 class="headline black--text">TO DO LIST</h3>
    </v-card>

    <v-btn
      class="buttonAdd ma-5"
      elevation="2"
      color="rgb(87, 204, 153, 0.4)"
      @click="dialog = true"
    >
      <v-icon> mdi-plus </v-icon>
    </v-btn>

    <div class="show-todolist pl-3">
      <v-row dense>
        <v-card
          v-for="(item, i) in todolist"
          :key="i"
          :color="typeNote(item)"
          class="pa-2 ma-3"
          elevation="12"
          outlined
          min-width="340px"
          max-width="340px"
        >
          <v-card-actions style="float:right">
            <v-spacer></v-spacer>
            <v-btn class="buttonEdit" icon small>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="buttonDel" icon small
              ><v-icon color="#B61919">mdi-close</v-icon>
            </v-btn>
          </v-card-actions>

          <v-card-title>
            <span class="headline">{{ item.title }}</span>
          </v-card-title>

          <hr />
          <v-card-text>
            <p class="text-wrap">{{ item.note }}</p>
          </v-card-text>
        </v-card>
      </v-row>
    </div>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline"> Add Note</span>
        </v-card-title>

        <v-card-text>
          <v-form align="center" ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.title"
              label="Title"
              :rules="titleRule"
              required
              outlined
            ></v-text-field>

            <v-text-field
              v-model="form.note"
              label="Note"
              :rules="noteRule"
              required
              outlined
            ></v-text-field>

            <v-select
              v-model="form.type"
              :items="['Important', 'Standard', 'Other']"
              label="Type"
              :rules="typeRule"
              required
              outlined
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            class="ma-2 white--text"
            color="#11698e"
            @click="(dialog = false), resetForm()"
          >
            Cancel
          </v-btn>

          <v-btn class="ma-2 white--text" color="red" @click="saveNote">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      titleRule: [
        (v) => !!v || "Title is required",
        (v) => (v || "").length <= 20 || "Max 20 characters",
      ],
      noteRule: [
        (v) => !!v || "Note is required",
        (v) => (v || "").length <= 100 || "Max 100 characters",
      ],
      typeRule: [(v) => !!v || "Type is required"],

      dialog: false,
      todolist: [
        {
          title: "Mini Project",
          note: "Create a To do list with your team, do your best!",
          type: "Important",
        },
        {
          title: "Coffee",
          note: "Don't forget to have a cup of coffee!",
          type: "Standard",
        },
        {
          title: "Thesis",
          note:
            "Don't forget to research and continue. Also, dont forget to rest",
          type: "Other",
        },
      ],
      form: {
        title: "",
        note: "",
        type: "",
      },
    };
  },

  methods: {
    saveNote() {
      if (this.$refs.form.validate()) {
        this.todolist.push({
          title: this.form.title,
          note: this.form.note,
          type: this.form.type,
        });

        this.dialog = false;
        this.resetForm();
        // this.$refs.form.reset();
      }
    },

    typeNote(item) {
      if (item.type == "Important") {
        return "#FF4848";
      } else if (item.type == "Standard") {
        return "#D5EEBB";
      } else {
        return "#FFE194";
      }
    },

    // charCount() {
    //   if (this.form.title.length > 20 || this.form.note.length > 50) {
    //     return true;
    //   } else return false;
    // },
    resetForm() {
      this.form = {
        title: "",
        note: "",
        type: "",
      };
      //   this.$refs.form.reset();
    },
  },
};
</script>
