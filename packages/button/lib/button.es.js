import {defineComponent, computed, resolveComponent, openBlock, createBlock, Fragment, createCommentVNode, mergeProps, withCtx, renderSlot, createVNode, toDisplayString} from "vue";
const preset = {
  add: {type: "", icon: "el-icon-plus", round: true},
  edit: {type: "", icon: "el-icon-edit-outline", round: true},
  delete: {type: "danger", icon: "el-icon-delete", round: true},
  confirm: {type: "primary", icon: "el-icon-check"},
  cancel: {type: "", icon: "el-icon-close"},
  pre: {type: "", icon: "el-icon-d-arrow-left"},
  next: {type: "", icon: "el-icon-d-arrow-right"},
  query: {type: "primary", icon: "el-icon-search"},
  set: {type: "", icon: "el-icon-setting", round: true},
  save: {type: "primary", icon: "el-icon-document"},
  append: {type: "", icon: "el-icon-check", round: true},
  call: {type: "primary", icon: "el-icon-phone-outline", round: true},
  blank: {type: "", icon: "el-icon-document"},
  success: {type: "success", icon: "el-icon-check"},
  fail: {type: "danger", icon: "el-icon-close"},
  plus: {type: "primary", icon: "", circle: true},
  minus: {type: "danger", icon: "", circle: true},
  refresh: {type: "primary", icon: ""},
  up: {type: "", icon: "el-icon-arrow-up", circle: true},
  down: {type: "", icon: "el-icon-arrow-down", circle: true},
  view: {type: "", icon: "el-icon-view", circle: true},
  display: {type: "success", icon: "el-icon-setting", circle: true},
  copy: {type: "primary", icon: "el-icon-document", circle: true},
  more: {type: "primary", icon: "el-icon-more", circle: true},
  download: {type: "primary", icon: "el-icon-download", round: true}
};
var _sfc_main = defineComponent({
  name: "EleButton",
  inheritAttrs: false,
  props: {
    tooltip: {
      type: Boolean,
      required: false
    }
  },
  emits: ["click"],
  setup: (_, context) => {
    const attrs = computed(() => {
      return Object.assign({}, context.attrs, preset[context.attrs.type]);
    });
    const content = computed(() => {
      var _a, _b;
      return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a)[0].children;
    });
    const onClick = (event) => {
      context.emit("click", event);
    };
    return {attrs, content, onClick};
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = resolveComponent("el-button");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  return openBlock(), createBlock(Fragment, null, [
    createCommentVNode(" button "),
    !_ctx.tooltip ? (openBlock(), createBlock(_component_el_button, mergeProps({key: 0}, _ctx.attrs, {onClick: _ctx.onClick}), {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 16, ["onClick"])) : (openBlock(), createBlock(Fragment, {key: 1}, [
      createCommentVNode(" tooltip "),
      createVNode(_component_el_tooltip, {
        disabled: !_ctx.content,
        "open-delay": 300,
        placement: "top",
        enterable: false
      }, {
        content: withCtx(() => [
          createVNode("span", {
            textContent: toDisplayString(_ctx.content)
          }, null, 8, ["textContent"])
        ]),
        default: withCtx(() => [
          createVNode(_component_el_button, mergeProps(_ctx.attrs, {onClick: _ctx.onClick}), null, 16, ["onClick"])
        ]),
        _: 1
      }, 8, ["disabled"])
    ], 64))
  ], 2112);
}
_sfc_main.render = _sfc_render;
_sfc_main.install = (app) => {
  app.component(_sfc_main.name, _sfc_main);
};
export default _sfc_main;
