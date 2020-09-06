<template>
  <el-card class="demo-card" shadow="hover">
    <template #header>
      <span><slot name="title"></slot></span>
      <el-popover placement="left-start">
        <slot name="code"></slot>
        <el-button class="demo-code" type="text" slot="reference">Code</el-button>
      </el-popover>
    </template>
    <slot name="content"></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.demo-card {
  border: 1px solid #99b9d0;
  ::v-deep .el-card__header {
    padding: 10px 10px;
    background-color: #99b9d0;
    font-size: 16px;
    font-weight: 700;
  }
  .demo-code {
    float: right;
    padding: 3px 0px;
    font-weight: bold;
    color: white;
  }
}

.el-card + .el-card {
  margin-top: 30px;
}
</style>

<style lang="scss">
.demo-card {
  p {
    margin: 1em 0 0 0;
    font-style: italic;
    color: #a9a9a9;
    font-weight: bold;
    font-size: 13px;
  }
  code {
    font-style: normal;
    color: #476582;
    padding: 0.25rem 0.5rem;
    margin: 0;
    font-size: 0.85em;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
  }
}
</style>
