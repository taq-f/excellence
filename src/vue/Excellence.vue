<template>
  <div class="container">
    <p>
      <input type="file" v-on:change="load($event.target.files)">
    </p>
    <p>
      {{ currentFile.name }}
    </p>
    <app-dialog ref="dialog" v-on:close="save($event)">
      <div class="preview-area">
        <table class="table">
          <tr v-for="line in currentFile.content">
            <td class="cell" v-for="element in line">{{ element }}</td>
          </tr>
        </table>
      </div>
    </app-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { read, utils } from "xlsx";
import Dialog from "./Dialog.vue";

const EXTENSIONS_ALLOWED = new Set([".csv", ".xls", ".xlsx"]);

interface AppData {
  currentFile: AppFile;
}

interface AppFile {
  name: string;
  content: string[][];
}

function getExtension(v: string): string {
  if (!v) {
    return "";
  }
  return v.substring(v.lastIndexOf("."));
}

export default Vue.extend({
  components: {
    "app-dialog": Dialog
  },
  data(): AppData {
    return {
      currentFile: { name: "", content: [] }
    };
  },
  methods: {
    load(files: FileList): void {
      if (!files || files.length === 0) {
        console.log("no file");
        return;
      }
      const file = files[0];

      const ext = getExtension(file.name);

      if (!EXTENSIONS_ALLOWED.has(ext)) {
        // TODO
        console.log(`${ext} not allowed.`);
        return;
      }

      this.currentFile = {
        name: file.name,
        content: []
      };
      this.render(file);

      const dialogRef: any = this.$refs.dialog;
      dialogRef.$emit("open", file);
    },
    render(file: File): void {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        const workbook = read(content, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = utils.sheet_to_json(sheet, { header: 1 }) as string[][];
        this.currentFile.content = data;
      };
      reader.readAsBinaryString(file);
    },
    save(data: string): void {
      console.log("Dialog closed!", data);
    }
  }
});
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
.preview-area {
  border: 1px solid #000;
  width: 100%;
  overflow: auto;
}
.table {
  border-collapse: separate;
  border-spacing: 0;
  border-width: 0;
  margin: 0;
  max-height: none;
  max-width: none;
  outline-width: 0;
  table-layout: fixed;
}
.cell {
  box-sizing: border-box;
  empty-cells: show;
  outline-width: 0;
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  font-size: 13px;
  font-weight: normal;
  padding: 0 4px;
}
</style>