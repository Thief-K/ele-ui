<template>
  <el-card shadow="hover">
    <template #header>
      <span><slot name="title"></slot></span>
      <el-popover placement="left-start" :visible-arrow="false">
        <el-button class="demo-code" type="text" slot="reference">Code</el-button>
      </el-popover>
    </template>
    <slot name="content"></slot>
  </el-card>
</template>

<style lang="scss" scoped>
::v-deep .el-card__header {
  padding: 10px 10px;
  background-color: #ebeef5;
  font-size: 16px;
  font-weight: 700;
  .demo-code {
    float: right;
    padding: 3px 0px;
    font-weight: bold;
  }
}

.el-card + .el-card {
  margin-top: 30px;
}
</style>
