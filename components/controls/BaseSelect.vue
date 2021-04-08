<template>
  <div :class="{'select-wrapper': true, 'select-wrapper__opened': opened}" @click="openSelect" v-click-outside="hideSelect">
    <div class="select-wrapper__overlay" v-if="opened" @click="hideSelect($event)"></div>
    <span class="select-wrapper__preview-text" v-if="inputType == 'text' || selected.length == 0">{{ selectText }}</span>
    <div class="select-custom" v-else-if="inputType == 'tags'">
      <div class="select-custom__item" v-for="(item) of selected" @click="removeOption(item)">
        {{ value.options[item]['name'] }}
      </div>
    </div>
    <div class="select-wrapper__options">
      <div v-if="isSearch" class="select-wrapper__search">
        <input v-model="searchReq" @input="search(searchReq)" type="text" class="input">
      </div>
      <div
        v-for="(category, index) in value.categories"
        :key="'c' + category.value"
        @click="categorySelect(index)"
        v-if="!selectedCategory"
        class="select-wrapper__option"
      >
        {{ category.name }}
      </div>
      <div
        v-show="typeof selectedCategory == 'number'"
        @click="categoryClose"
        class="select-wrapper__option select-wrapper__option_back"
      >
        close category
      </div>
      <div
        v-for="(option, index) in value.options"
        :key="option.value"
        @click="optionSelect(index, $event)"
        :class="{'select-wrapper__option': true,'select-wrapper__option_selected': option.selected}"
        v-show="option.searched && (selectedCategory === true || selectedCategory === option.category)"
      >
        <span v-if="option['showInList']">{{option['showInList']}}</span>
        <span v-else>{{ option['name'] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: "SelectComp",
  watch: {
    selected: function (val) {
      let selectedNames = this.getSelectedNames()
      if (this.value) {
        this.value.selected = val
        this.value.selectedNames = selectedNames
      }
      this.$emit('selected', selectedNames)
    }
  },
  props: {
    value: {
      type: Object
    },
    placeholder: {
      type: String
    }
  },
  data: () => ({
    selected: [],
    opened: false,
    searchReq: '',
    multi: false,
    inputType: 'text',
    isSearch: false,
    selectedCategory: false
  }),
  computed: {
    selectText() {
      if (this.selected.length > 0 && typeof this.selected == 'object') {
        let text = ''
        for (let item of this.selected) {
          if (text.length > 1) {
            text = `${text}, `
          }
          text = `${text}${this.value.options[item]['name']}`
        }
        return text
      } else if (this.placeholder) {
        return this.placeholder
      } else {
        if (this.multi) {
          return 'Pick one(or more)'
        }
        return 'Pick one'
      }
    }
  },
  methods: {
    // начал делать, понял что не нужно, доделывать не стал
    // selectByName(name) {
    //   for (let option in this.value.options) {
    //     if (this.value.options[option]['name'] == name) {
    //       console.log(option)
    //     }
    //   }
    // },
    getSelectedNames() {
      let selectedNames = []
      for (let i of this.selected) {
        selectedNames.push(this.value.options[i].name)
      }
      return selectedNames
    },
    search(req) {
      for (let option in this.value.options) {
        const str = this.value.options[option].name.toLowerCase()
        this.value.options[option].searched = null
        if(str.indexOf(req.toLowerCase()) + 1) {
          this.value.options[option].searched = true
        }
      }
    },
    addOption(data) {
      if (!this.multi) {
        for (let option in this.value.options) {
          this.value.options[option]['selected'] = false
        }
        this.selected = [data]
      } else {
        this.selected.push(data)
      }
      this.value.options[data]['selected'] = true
    },
    removeOption(data) {
      if (this.multi) {
        let index = this.selected.indexOf(data)
        if (index > -1) {
          this.selected.splice(index, 1)
        }
      } else {
        this.selected = []
      }
      this.value.options[data]['selected'] = false
    },
    categorySelect(data) {
      this.categoryClose()
      this.value.categories[data].selected = true
      this.selectedCategory = this.value.categories[data].value
    },
    categoryClose() {
      for (let category of this.value.categories) {
        category['selected'] = false
      }
      this.selectedCategory = false
    },
    optionSelect(data, e) {
      if (this.value.options[data]['selected']) {
        this.removeOption(data)
      } else {
        this.addOption(data)
      }
      if (!this.multi) {
        this.hideSelect()
      }
      e.stopPropagation()
    },
    openSelect() {
      this.opened = true
    },
    hideSelect() {
      this.opened = false
    },
    toggleSelect() {
      if (this.opened) {
        this.opened = false
      } else {
        this.opened = true
      }
    },
  },
  created() {
    if (this.value) {
      if (this.value.multi) {
        this.multi = true
      }
      if (this.value.inputType && this.value.inputType !== 'list') {
        this.inputType = this.value.inputType
      }
      if (this.value.isSearch) {
        this.isSearch = true
      }
      if (typeof this.value.categories !== 'undefined') {
        this.selectedCategory = false
      } else {
        this.selectedCategory = true
      }
      if (!this.value.selected) {
        this.value.selected = []
      }
      for (let option in this.value.options) {
        option = +option
        if (typeof this.value.options[option].selected == 'undefined') {
          this.$set(this.value.options[option], 'selected', false)
        } else if (this.value.options[option].selected == true) {
          this.addOption(option)
        }
        this.value.options[option].searched = true
      }
    }
  },
  directives: {
    ClickOutside
  },
}
</script>

<style lang="scss">
.select-wrapper {
  display:flex;
  width: auto;
  padding-left: 6px;
  padding-right: 9px;
  border-radius: 4px;
  align-items:center;
  -webkit-appearance:none;
  -moz-appearance:none;
  appearance:none;
  background:transparent;
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 5px;
    background-image: url('base-select/show.svg');
    background-repeat: no-repeat;
    background-position: center left;
    transform-origin: center;
    transition: 0.25s;
  }
}

.select-wrapper__preview-text {
  color: $grey;
  white-space: nowrap;
}

.select-wrapper__overlay {
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.select-wrapper__options {
  position: absolute;
  top: calc(100% + 6px);
  left: -1px;
  right: -1px;
  display: none;
  padding: 8px 0;
  max-height: 40vh;
  overflow: auto;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 999;
}
.select-wrapper__search {
  background-color: #F0F0F0;
  padding: 4px 16px;
}
.select-wrapper__option {
  position: relative;
  display: block;
  padding: 6px 12px 5px;
  background-color: #fff;
  color: $grey;
  cursor: pointer;
  &:hover {
    background-color: #F8F8F8;
  }
  &_selected {
    background-color: #F0F0F0;
    background-image: url('base-select/ok-black.svg');
    background-repeat: no-repeat;
    background-position: right 18px center;
    color: $black;
  }
  &_back {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 15px 10px 49px;
    color: #999;
    background-color: #F0F0F0;
    background-image: url('base-select/arrow-left.svg');
    background-repeat: no-repeat;
    background-position: left 15px center;
  }
}

.select-wrapper__opened {
  cursor: default;
  &:after {
    transform: rotate(180deg);
  }
  .select-wrapper__options {
    display: block;
  }
}

.select-custom {
  position:relative;
  display:flex;
  width: 100%;
  min-width: 380px;
  padding: 9px 0;
  border-radius: 4px;
  align-items:center;
  -webkit-appearance:none;
  -moz-appearance:none;
  appearance:none;
  background:transparent;
}
.select-custom__item {
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 13px;
  border: 1px solid #D9D9D9;
  background: #F9F9F9;
  border-radius: 3px;
  &:after {
    width: 9px;
    height: 9px;
    margin: 0 0 -3px 15px;
    background-image: url('base-select/close.svg');
    background-position: center center;
    background-size: 9px 9px;
    background-repeat: no-repeat;
    content: '';
  }
  &:not(:last-child) {
    margin-right: 7px;
  }
}

@media (max-width: 450px) {
  .select-wrapper {
    min-width: auto;
  }
}

</style>
