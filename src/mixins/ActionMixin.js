import { loadData, likeSearch, deleteItems, updateItem, addItem } from '@/model/BaseModel'
import { isFunction, isOjbect } from '@/utils/utils'

function handleResult(model, res) {
  model.onResult && model.onResult(res)
  model.afterAction && model.afterAction(res)
}

function handleError(model, error) {
  model.onError && model.onError(error)
  model.afterAction && model.afterAction(error)
}

function checkParams(model) {
  if (isFunction(model.params)) {
    return model.params()
  } else if (isOjbect(model.params)) {
    return model.params
  } else {
    return false
  }
}

export const MultiSelection = {
  data() {
    return {
      selectedItems: []
    }
  },
  methods: {
    handleSelectionChange(selectedItems) {
      this.selectedItems = selectedItems
    }
  }
}

export const GetDataMixin = {
  data() {
    return {
      getDataModel: {
        init: false
      }
    }
  },
  methods: {
    initGetData({ url, method, params, beforeAction, onResult, onError, afterAction }) {
      if (!url) {
        throw new Error('please init url')
      }
      this.getDataModel.url = url
      this.getDataModel.method = method
      this.getDataModel.onResult = onResult
      this.getDataModel.onError = onError
      this.getDataModel.params = params || {}
      this.getDataModel.beforeAction = beforeAction
      this.getDataModel.afterAction = afterAction
      this.getDataModel.init = true
      return Promise.resolve(this.getDataModel.init)
    },
    getData() {
      const data = checkParams(this.getDataModel)
      if (!data) {
        throw new Error('please set get param')
      }
      this.getDataModel.beforeAction && this.getDataModel.beforeAction()
      loadData.call(this, {
        url: this.getDataModel.url,
        method: this.getDataModel.method || 'post',
        data
      }).then((res) => {
        handleResult.call(this, this.getDataModel, res)
      }).catch((error) => {
        handleError.call(this, this.getDataModel, error)
      })
    }
  }
}

export const LikeSearchMixin = {
  data() {
    return {
      likeSearchModel: {
        init: false,
        conditionItems: []
      }
    }
  },
  methods: {
    initLikeSearch({ url, method, conditionItems, extraParams, beforeAction, onResult, onError, afterAction }) {
      if (!url) {
        throw new Error('please init url')
      }
      if (!onResult) {
        throw new Error('please init onSearchResult function')
      }
      if (!(onResult instanceof Function)) {
        throw new Error('onSearchResult must be Function type')
      }
      this.likeSearchModel.url = url
      this.likeSearchModel.method = method
      this.likeSearchModel.conditionItems = conditionItems
      this.likeSearchModel.extraParams = extraParams
      this.likeSearchModel.onResult = onResult
      this.likeSearchModel.onError = onError
      this.likeSearchModel.beforeAction = beforeAction
      this.likeSearchModel.afterAction = afterAction
      this.likeSearchModel.init = true
    },
    doSearch() {
      if (!this.likeSearchModel.init) {
        throw new Error('please init likeSearchModel first')
      }
      let searchParams = this.generatorSearchParams()
      if (isOjbect(this.likeSearchModel.extraParams)) {
        searchParams = { ...searchParams, ...this.likeSearchModel.extraParams }
      } else if (isFunction(this.likeSearchModel.extraParams)) {
        searchParams = { ...searchParams, ...this.likeSearchModel.extraParams() }
      }
      likeSearch.call(this, {
        url: this.likeSearchModel.url,
        method: this.likeSearchModel.method || 'post',
        data: searchParams
      }).then((res) => {
        handleResult.call(this, this.likeSearchModel, res)
      }).catch((error) => {
        handleError.call(this, this.likeSearchModel, error)
      })
    },
    resetSearch() {
      this.likeSearchModel.conditionItems && this.likeSearchModel.conditionItems.forEach(it => { it.value = '' })
    },
    hasSearchParams() {
      return this.likeSearchModel.conditionItems.some(it => it.value !== '')
    },
    generatorSearchParams() {
      if (this.likeSearchModel.conditionItems && this.likeSearchModel.conditionItems.length !== 0) {
        return this.likeSearchModel.conditionItems.reduce((pre, cur) => {
          pre[cur.name] = cur.value
          return pre
        }, {})
      }
      return {}
    }
  }
}

export const DeleteItemsMixin = {
  mixins: [MultiSelection],
  data() {
    return {
      deleteItemsModel: {
        init: false
      }
    }
  },
  methods: {
    initDeleteItem({ url, method, params, multiParams, onDeleteItem, onDeleteMultiItem, beforeAction, onResult, onError, afterAction }) {
      if (!url) {
        throw new Error('please init url')
      }
      this.deleteItemsModel.url = url
      this.deleteItemsModel.method = method
      this.deleteItemsModel.onResult = onResult
      this.deleteItemsModel.onError = onError
      this.deleteItemsModel.beforeAction = beforeAction
      this.deleteItemsModel.afterAction = afterAction
      this.deleteItemsModel.params = params
      this.deleteItemsModel.multiParams = multiParams
      this.deleteItemsModel.onDeleteItem = onDeleteItem
      this.deleteItemsModel.onDeleteMultiItem = onDeleteMultiItem
      this.deleteItemsModel.init = true
    },
    onDeleteItem(item) {
      if (!this.deleteItemsModel.onDeleteItem) {
        throw new Error('please init onDeleteItem')
      }
      if (!(this.deleteItemsModel.onDeleteItem instanceof Function)) {
        throw new Error('onDeleteItem must be Function')
      }
      this.deleteItemsModel.onDeleteItem(item)
    },
    onDeleteMultiItem() {
      if (!this.deleteItemsModel.onDeleteMultiItem) {
        throw new Error('please init onDeleteMultiItem')
      }
      if (!(this.deleteItemsModel.onDeleteMultiItem instanceof Function)) {
        throw new Error('onDeleteMultiItem must be Function')
      }
      this.deleteItemsModel.onDeleteMultiItem()
    },
    doDeleteItem(mode = 'single') {
      if (!this.deleteItemsModel.init) {
        throw new Error('please init deleteItemsModel first')
      }
      let data = {}
      if (mode === 'single') {
        data = checkParams(this.deleteItemsModel)
      } else if (mode === 'multi') {
        if (this.deleteItemsModel.multiParams && isFunction(this.deleteItemsModel.multiParams)) {
          data = this.deleteItemsModel.multiParams(this.selectedItems)
        } else {
          throw new Error('please set multi params and `multiParams` must be Function type')
        }
      } else {
        throw new Error('only support delete single or multi')
      }
      if (!data) {
        throw new Error('please set delete param')
      }
      deleteItems.call(this, {
        url: this.deleteItemsModel.url,
        method: this.deleteItemsModel.method || 'post',
        data
      }).then((res) => {
        handleResult.call(this, this.deleteItemsModel, res)
      }).catch((error) => {
        handleError.call(this, this.deleteItemsModel, error)
      })
    }
  }
}

export const UpdateItemMixin = {
  data() {
    return {
      updateItemModel: {
        init: false
      }
    }
  },
  methods: {
    initUpdateItem({ url, method, params, onUpdateItem, beforeAction, onResult, onError, afterAction }) {
      if (!url) {
        throw new Error('please init url')
      }
      this.updateItemModel.url = url
      this.updateItemModel.method = method
      this.updateItemModel.params = params
      this.updateItemModel.onResult = onResult
      this.updateItemModel.onError = onError
      this.updateItemModel.beforeAction = beforeAction
      this.updateItemModel.afterAction = afterAction
      this.updateItemModel.onUpdateItem = onUpdateItem
      this.updateItemModel.init = true
    },
    onUpdateItem(item) {
      if (!this.updateItemModel.onUpdateItem) {
        throw new Error('please init onUpdateItem')
      }
      if (!(this.updateItemModel.onUpdateItem instanceof Function)) {
        throw new Error('onUpdateItem must be Function')
      }
      this.updateItemModel.onUpdateItem(item)
    },
    doUpdateItem() {
      if (!this.updateItemModel.init) {
        throw new Error('please init updateItemModel first')
      }
      const data = checkParams(this.updateItemModel)
      if (!data) {
        throw new Error('please set update param')
      }
      updateItem.call(this, {
        url: this.updateItemModel.url,
        method: this.updateItemModel.method || 'post',
        data
      }).then((res) => {
        handleResult.call(this, this.updateItemModel, res)
      }).catch((error) => {
        handleError.call(this, this.updateItemModel, error)
      })
    }
  }
}

export const AddItemMixin = {
  data() {
    return {
      addItemModel: {
        init: false
      }
    }
  },
  methods: {
    initAddItem({ url, method, params, onAddItem, beforeAction, onResult, onError, afterAction }) {
      if (!url) {
        throw new Error('please init url')
      }
      this.addItemModel.url = url
      this.addItemModel.method = method
      this.addItemModel.params = params
      this.addItemModel.onResult = onResult
      this.addItemModel.onError = onError
      this.addItemModel.beforeAction = beforeAction
      this.addItemModel.afterAction = afterAction
      this.addItemModel.onAddItem = onAddItem
      this.addItemModel.init = true
    },
    onAddItem() {
      if (!this.addItemModel.onAddItem) {
        throw new Error('please init onAddItem')
      }
      if (!(this.addItemModel.onAddItem instanceof Function)) {
        throw new Error('onAddItem must be Function')
      }
      this.addItemModel.onAddItem()
    },
    doAddItem() {
      if (!this.addItemModel.init) {
        throw new Error('please init addItemModel first')
      }
      const data = checkParams(this.addItemModel)
      if (!data) {
        throw new Error('please set add param')
      }
      addItem.call(this, {
        url: this.addItemModel.url,
        method: this.addItemModel.method || 'post',
        data
      }).then((res) => {
        handleResult.call(this, this.addItemModel, res)
      }).catch((error) => {
        handleError.call(this, this.addItemModel, error)
      })
    }
  }
}

export const CommonActionMixin = {
  methods: {
    performAction({ url, method, params, beforeAction, onResult, onError, afterAction }) {
      if (!url) {
        throw new Error('url must be set')
      }
      let data = {}
      if (isFunction(params)) {
        data = params()
      } else if (isOjbect(params)) {
        data = params
      }
      beforeAction && beforeAction()
      loadData.call(this, {
        url,
        method: method || 'post',
        data: data || {}
      }).then((res) => {
        onResult && onResult(res)
        afterAction && afterAction()
      }).catch((error) => {
        onError && onError(error)
        afterAction && afterAction()
      })
    }
  }
}

export const RefreshActionMixin = {
  methods: {
    doRefresh() {
      if (this.isInited('likeSearchModel')) {
        if (this.hasSearchParams()) { // 搜索有值，优先执行模糊搜索的方法
          this.doSearch()
        } else { // 执行普通的列表查询
          this.getData()
        }
      } else if (this.isInited('getDataModel')) { // 执行普通的列表查询
        this.getData()
      } else { // 如果都没有设置就报错
        throw new Error('can`t exec doRefresh function')
      }
    }
  }
}

export default {
  mixins: [GetDataMixin, UpdateItemMixin, AddItemMixin, DeleteItemsMixin]
}
