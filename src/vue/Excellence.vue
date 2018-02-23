<template>
  <div class="container">
    <p>
      <input type="file" v-on:change="fileChange($event.target.files)">
    </p>
    <p>
      {{ currentFile.name }}
    </p>
    <div class="preview-area">
      <table class="table">
        <tr v-for="line in content">
          <td class="cell" v-for="element in line">{{ element }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
const XLSX = require("xlsx");
const EXTENSIONS_ALLOWED = new Set(["xlsx"]);

module.exports = {
  data: function() {
    return {
      currentFile: {},
      content: []
    };
  },
  methods: {
    fileChange(files) {
      if (!files || files.length === 0) {
        console.log("no file");
        return;
      }
      const file = files[0];

      this.readFile(file);

      this.currentFile = {
        name: file.name
      };
    },
    readFile(file) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        const workbook = XLSX.read(content, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log(data);
        this.content = data;
      };
      reader.readAsBinaryString(file);
    }
  }
};
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