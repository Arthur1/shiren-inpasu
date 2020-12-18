<template>
  <b-container>
    <h1 class="mt-4 text-primary">原始に続く穴</h1>
    <div class="mt-3">
      <b-button @click="openResetAppearsModal" variant="outline-danger"><b-icon-trash /> リセット</b-button>
    </div>
    <div class="mt-3">
      <b-form inline class="mt-3">
        <b-input-group prepend="買値" append="G" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input v-model.number="buyPrice" type="number"></b-form-input>
        </b-input-group>
        <b-input-group prepend="売値" append="G" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input v-model.number="sellPrice" type="number"></b-form-input>
        </b-input-group>
      </b-form>
      <b-form class="mt-3">
        <b-form-group>
          <b-form-radio-group
            v-model.number="state"
            :options="states"
            name="state"
          />
        </b-form-group>
      </b-form>
      <b-form class="mt-3">
        <b-form-group>
          <b-form-radio-group
            v-model="wayToGet"
            :options="waysToGet"
            name="wayToGet"
          />
        </b-form-group>
      </b-form>
      <b-form inline class="mt-3">
        <b-input-group prepend="容量" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input v-model.number="size" type="number" :disabled="sizeIsDisabled"></b-form-input>
        </b-input-group>
        <b-button @click="clearSearch" variant="warning"><b-icon-x-circle /> 検索クリア</b-button>
      </b-form>
    </div>
    <div class="mt-3">
      <b-form inline>
        <b-input-group>
          <b-form-checkbox
            v-model="onlyUnappear"
            switch
          >
            未識別のみ表示
          </b-form-checkbox>
        </b-input-group>
        <b-input-group class="ml-0 ml-sm-3">
          <b-form-checkbox
            v-model="onlyNatural"
            switch
          >
            自然な容量・回数のみ表示
          </b-form-checkbox>
        </b-input-group>
      </b-form>
    </div>
    <b-tabs v-model="activeTabId" class="mt-4 mb-4" content-class="mt-3">
      <b-tab title="腕輪">
        <b-list-group v-if="isPriceMode">
          <b-list-group-item
            v-for="price in filteredBraceletPrices"
            :key="`${price.itemId}_${price.state}_${price.size}`"
            class="d-flex justify-content-between align-items-center"
          >
            <b-form-checkbox v-model="appears[price.itemId - 1]">
              {{ items[price.itemId - 1].name }}
            </b-form-checkbox>
            <a href="#" @click.prevent="openItemModal(items[price.itemId - 1])">
              <b-icon-info-circle />
            </a>
          </b-list-group-item>
        </b-list-group>
        <b-list-group v-else>
          <b-list-group-item
            v-for="item in filteredBracelets"
            :key="item.id"
            class="d-flex justify-content-between align-items-center"
          >
            <b-form-checkbox v-model="appears[item.id - 1]">
              {{ item.name }}
            </b-form-checkbox>
            <a href="#" @click.prevent="openItemModal(item)">
              <b-icon-info-circle />
            </a>
          </b-list-group-item>
        </b-list-group>
      </b-tab>
      <b-tab title="杖">
        <b-list-group v-if="isPriceMode">
          <b-list-group-item
            v-for="price in filteredWandPrices"
            :key="`${price.itemId}_${price.state}_${price.size}`"
            :variant="price.isNatural === false ? 'warning' : ''"
            class="d-flex justify-content-between align-items-center"
          >
            <b-form-checkbox v-model="appears[price.itemId - 1]">
              {{ items[price.itemId - 1].name }}[{{ price.size }}]
            </b-form-checkbox>
            <a href="#" @click.prevent="openItemModal(items[price.itemId - 1])">
              <b-icon-info-circle />
            </a>
          </b-list-group-item>
        </b-list-group>
        <b-list-group v-else>
          <b-list-group-item
            v-for="item in filteredWands"
            :key="item.id"
            class="d-flex justify-content-between align-items-center"
          >
            <b-form-checkbox v-model="appears[item.id - 1]">
              {{ item.name }}
            </b-form-checkbox>
            <a href="#" @click.prevent="openItemModal(item)">
              <b-icon-info-circle />
            </a>
          </b-list-group-item>
        </b-list-group>
      </b-tab>
      <b-tab title="札">
        <b-list-group v-if="isPriceMode">
          <b-list-group-item
            v-for="price in filteredCardPrices"
            :key="`${price.itemId}_${price.state}_${price.size}`"
            class="d-flex justify-content-between align-items-center"
          >
            <b-form-checkbox v-model="appears[price.itemId - 1]">
              {{ items[price.itemId - 1].name }}
            </b-form-checkbox>
            <a href="#" @click.prevent="openItemModal(items[price.itemId - 1])">
              <b-icon-info-circle />
            </a>
          </b-list-group-item>
        </b-list-group>
        <b-list-group v-else>
          <b-list-group-item
            v-for="item in filteredCards"
            :key="item.id"
            class="d-flex justify-content-between align-items-center"
          >
            <b-form-checkbox v-model="appears[item.id - 1]">
              {{ item.name }}
            </b-form-checkbox>
            <a href="#" @click.prevent="openItemModal(item)">
              <b-icon-info-circle />
            </a>
          </b-list-group-item>
        </b-list-group>
      </b-tab>
      <b-tab title="巻物">
        <b-list-group v-if="isPriceMode">
          <b-list-group-item
            v-for="price in filteredScrollPrices"
            :key="`${price.itemId}_${price.state}_${price.size}`"
            class="d-flex justify-content-between align-items-center"
          >
            <b-form-checkbox v-model="appears[price.itemId - 1]">
              {{ items[price.itemId - 1].name }}
            </b-form-checkbox>
            <a href="#" @click.prevent="openItemModal(items[price.itemId - 1])">
              <b-icon-info-circle />
            </a>
          </b-list-group-item>
        </b-list-group>
        <b-list-group v-else>
          <b-list-group-item
            v-for="item in filteredScrolls"
            :key="item.id"
            class="d-flex justify-content-between align-items-center"
          >
            <b-form-checkbox v-model="appears[item.id - 1]">
              {{ item.name }}
            </b-form-checkbox>
            <a href="#" @click.prevent="openItemModal(item)">
              <b-icon-info-circle />
            </a>
          </b-list-group-item>
        </b-list-group>
      </b-tab>
      <b-tab title="草">
        <b-list-group v-if="isPriceMode">
          <b-list-group-item
            v-for="price in filteredGrassPrices"
            :key="`${price.itemId}_${price.state}_${price.size}`"
            class="d-flex justify-content-between align-items-center"
          >
            <b-form-checkbox v-model="appears[price.itemId - 1]">
              {{ items[price.itemId - 1].name }}
            </b-form-checkbox>
            <a href="#" @click.prevent="openItemModal(items[price.itemId - 1])">
              <b-icon-info-circle />
            </a>
          </b-list-group-item>
        </b-list-group>
        <b-list-group v-else>
          <b-list-group-item
            v-for="item in filteredGrasses"
            :key="item.id"
            class="d-flex justify-content-between align-items-center"
          >
            <b-form-checkbox v-model="appears[item.id - 1]">
              {{ item.name }}
            </b-form-checkbox>
            <a href="#" @click.prevent="openItemModal(item)">
              <b-icon-info-circle />
            </a>
          </b-list-group-item>
        </b-list-group>
      </b-tab>
      <b-tab title="壺">
        <b-list-group v-if="isPriceMode">
          <b-list-group-item
            v-for="price in filteredPotPrices"
            :key="`${price.itemId}_${price.state}_${price.size}`"
            :variant="price.isNatural === false ? 'warning' : ''"
            class="d-flex justify-content-between align-items-center"
          >
            <b-form-checkbox v-model="appears[price.itemId - 1]">
              {{ items[price.itemId - 1].name }}[{{ price.size }}]
            </b-form-checkbox>
            <a href="#" @click.prevent="openItemModal(items[price.itemId - 1])">
              <b-icon-info-circle />
            </a>
          </b-list-group-item>
        </b-list-group>
        <b-list-group v-else>
          <b-list-group-item
            v-for="item in filteredPots"
            :key="item.id"
            class="d-flex justify-content-between align-items-center"
          >
            <b-form-checkbox v-model="appears[item.id - 1]">
              {{ item.name }}
            </b-form-checkbox>
            <a href="#" @click.prevent="openItemModal(item)">
              <b-icon-info-circle />
            </a>
          </b-list-group-item>
        </b-list-group>
      </b-tab>
    </b-tabs>
    <b-modal ref="itemModal" hide-footer :title="modalItem ? modalItem.name : ''">
      <div class="d-block">
        <p>
          {{ modalItem ? modalItem.text : '' }}
        </p>
        <div v-if="modalItem && modalItem.memo">
          <h5 class="text-secondary">メモ</h5>
          <p>
            {{ modalItem.memo }}
          </p>
        </div>
      </div>
    </b-modal>
    <b-modal
      ref="resetAppearsModal"
      title="リセット"
      ok-title="リセットする"
      ok-variant="danger"
      cancel-title="考え直す"
      cancel-variant="dark"
      @ok="okResetAppearsModal"
    >
      <p>
        本当に識別済み情報をリセットしてもよろしいですか？
      </p>
    </b-modal>
  </b-container>
</template>

<script>
import items from '@/assets/json/genshi_items.json'
import prices from '@/assets/json/genshi_prices.json'
export default {
  data() {
    return {
      activeTabId: 0,
      buyPrice: '',
      sellPrice: '',
      state: 0,
      wayToGet: '',
      size: '',
      onlyUnappear: false,
      onlyNatural: false,
      states: [
        {
          text: '呪い・封印',
          value: -1,
        },
        {
          text: '通常',
          value: 0,
        },
        {
          text: '祝福',
          value: 1,
        },
      ],
      waysToGet: [
        {
          text: '床',
          value: 'inFloor',
        },
        {
          text: '盗',
          value: 'inTodo',
        },
        {
          text: 'ト',
          value: 'inTorikomareru',
        },
        {
          text: '変',
          value: 'inChange',
        },
        {
          text: '店',
          value: 'inShop',
        },
        {
          text: '高',
          value: 'inExShop',
        },
      ],
      appears: [],
       modalItem: null,
      items,
      prices,
    }
  },
  computed: {
    bracelets() {
      return this.items.filter(item => item.type === '腕輪')
    },
    wands() {
      return this.items.filter(item => item.type === '杖')
    },
    cards() {
      return this.items.filter(item => item.type === '札')
    },
    scrolls() {
      return this.items.filter(item => item.type === '巻物')
    },
    grasses() {
      return this.items.filter(item => item.type === '草')
    },
    pots() {
      return this.items.filter(item => item.type === '壺')
    },
    filteredBracelets() {
      return this.filterItems(this.bracelets)
    },
    filteredWands() {
      return this.filterItems(this.wands)
    },
    filteredCards() {
      return this.filterItems(this.cards)
    },
    filteredScrolls() {
      return this.filterItems(this.scrolls)
    },
    filteredGrasses() {
      return this.filterItems(this.grasses)
    },
    filteredPots() {
      return this.filterItems(this.pots)
    },
    braceletPrices() {
      return this.prices.filter(price => this.items[price.itemId - 1].type === '腕輪')
    },
    wandPrices() {
      return this.prices.filter(price => this.items[price.itemId - 1].type === '杖')
    },
    cardPrices() {
      return this.prices.filter(price => this.items[price.itemId - 1].type === '札')
    },
    scrollPrices() {
      return this.prices.filter(price => this.items[price.itemId - 1].type === '巻物')
    },
    grassPrices() {
      return this.prices.filter(price => this.items[price.itemId - 1].type === '草')
    },
    potPrices() {
      return this.prices.filter(price => this.items[price.itemId - 1].type === '壺')
    },
    filteredBraceletPrices() {
      let prices = this.braceletPrices
      return this.filterPrices(prices)
    },
    filteredWandPrices() {
      let prices = this.wandPrices
      prices = this.filterPrices(prices)
      if (this.size !== '') {
        prices = prices.filter(price => price.size === this.size)
      }
      if (this.onlyNatural) {
        prices = prices.filter(price => price.isNatural !== false)
      }
      return prices
    },
    filteredCardPrices() {
      let prices = this.cardPrices
      return this.filterPrices(prices)
    },
    filteredScrollPrices() {
      let prices = this.scrollPrices
      return this.filterPrices(prices)
    },
    filteredGrassPrices() {
      let prices = this.grassPrices
      return this.filterPrices(prices)
    },
    filteredPotPrices() {
      let prices = this.potPrices
      prices = this.filterPrices(prices)
      if (this.size !== '') {
        prices = prices.filter(price => price.size === this.size)
      }
      if (this.onlyNatural) {
        prices = prices.filter(price => price.isNatural !== false)
      }
      return prices
    },
    isPriceMode() {
      return this.buyPrice !== '' || this.sellPrice !== ''
    },
    sizeIsDisabled() {
      return [0, 2, 3, 4].includes(this.activeTabId)
    },
  },
  created() {
    try {
      const savedAppearsJson = window.localStorage.getItem('genshi_appears')
      if (savedAppearsJson === null) throw 'Empty localStorage Error'
      this.appears = JSON.parse(savedAppearsJson)
    } catch (_) {
      this.resetAppears()
    }
  },
  head() {
    return {
      title: '原始へ続く穴',
    }
  },
  methods: {
    filterItems(items) {
      if (this.onlyUnappear) {
        items = items.filter(item => !this.appears[item.id - 1])
      }
      if (this.wayToGet) {
        items = items.filter(item => item[this.wayToGet])
      }
      return items
    },
    filterPrices(prices) {
      prices = prices.filter(price => price.state === this.state)
      if (this.buyPrice !== '') {
        prices = prices.filter(price => price.buyPrice === this.buyPrice)
      }
      if (this.sellPrice !== '') {
        prices = prices.filter(price => price.sellPrice === this.sellPrice)
      }
      if (this.onlyUnappear) {
        prices = prices.filter(price => !this.appears[price.itemId - 1])
      }
      return prices
    },
    clearSearch() {
      this.buyPrice = ''
      this.sellPrice = ''
      this.size = ''
      this.state = 0
      this.wayToGet = ''
    },
    resetAppears() {
      this.appears = this.items.map(item => false)
    },
    openItemModal(item) {
      this.modalItem = item
      this.$refs.itemModal.show()
    },
    openResetAppearsModal() {
      this.$refs.resetAppearsModal.show()
    },
    okResetAppearsModal() {
      this.resetAppears()
      this.$toast.error('識別情報をリセットしました')
    },
  },
  watch: {
    appears(newAppears) {
      localStorage.setItem('genshi_appears', JSON.stringify(newAppears))
    },
  },
}
</script>
<style>
.modal-backdrop {
  opacity: 0.5;
}
</style>
