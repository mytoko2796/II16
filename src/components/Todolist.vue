<template>
  <v-main>
    <v-card
      class="mx-auto pa-5 ma-5"
      align="center"
      max-width="200px"
      color="#11698e"
      elevation="12"
      outlined
    >
      <h3 class="headline white--text">TO DO LIST</h3>
    </v-card>

    <v-btn class="buttonAdd ma-5" elevation="2" @click="dialog = true">
      Add
    </v-btn>

    <div class="show-todolist">
      <v-card
        v-for="(item, i) in todolist"
        :key="i"
        class="ma-5"
        :color="typeNote(item)"
        persistent
        max-width="400px"
      >
        <v-card-title>
          <span class="headline">{{ item.title }}</span>
        </v-card-title>

        <v-card-text>
          <p>{{ item.note }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="buttonDel" elevation="2"> Delete </v-btn>
          <v-btn class="buttonEdit" elevation="2">
            <!-- <v-icon color="black">mdi-pencil</v-icon> -->
          </v-btn>
        </v-card-actions>
      </v-card>
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
              v-on:input="charCount"
              required
              outlined
            ></v-text-field>
            <span class="alert-txt" v-if="this.form.title.length > 10">
              Tidak boleh lebih dari 10!
            </span>

            <v-text-field
              v-model="form.note"
              label="Note"
              :rules="noteRule"
              v-on:input="charCount"
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

          <v-btn
            :disabled="charCount()"
            class="ma-2 white--text"
            color="red"
            @click="saveNote"
          >
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
      titleRule: [(v) => !!v || "Title tidak boleh kosong"],
      noteRule: [(v) => !!v || "Note tidak boleh kosong"],
      typeRule: [(v) => !!v || "Type tidak boleh kosong"],

      dialog: false,
      todolist: [
        {
          title: "JUDUL",
          note: "KETERANGAN",
          type: "Standard",
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
        return "red";
      } else if (item.type == "Standard") {
        return "green";
      } else {
        return "yellow";
      }
    },

    charCount() {
      if (this.form.title.length > 10 || this.form.note.length > 10) {
        return true;
      } else return false;
    },
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
