<template>
  <div>
    <div v-if="file">
      {{ file.name }}

      <table class="table">
        <tr v-for="line in content">
          <td class="cell" v-for="element in line">{{ element }}</td>
        </tr>
      </table>

    </div>
    <div v-else>
      no file
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { read, utils } from "xlsx";

const EXTENSIONS_ALLOWED = new Set([".csv", ".xls", ".xlsx"]);
const HORIZONTAL_CANDIDATES = "ABC".split("");

console.log(HORIZONTAL_CANDIDATES);

function getExtension(v: string): string {
  if (!v) {
    return "";
  }
  return v.substring(v.lastIndexOf("."));
}

export default Vue.extend({
  props: ["file"],
  watch: {
    file(newFile: File, oldFile: File): void {
      if (!newFile) {
        return;
      }
      const file = newFile;

      const ext = getExtension(file.name);
      if (!EXTENSIONS_ALLOWED.has(ext)) {
        throw new Error(`unknown file extension: ${ext}`);
      }

      this.render(file);
    }
  },
  data(): { content?: string[][] } {
    return {
      content: undefined
    };
  },
  methods: {
    render(file: File): void {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        const workbook = read(content, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        // const data = utils.sheet_to_json(sheet, { header: 1 }) as string[][];
        const data = sheet["A5"].v;
        this.content = [[data]];
      };
      reader.readAsBinaryString(file);
    },
    getSelection(): string[] {
      return ["data"];
    }
  }
});
</script>

<style scoped>
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