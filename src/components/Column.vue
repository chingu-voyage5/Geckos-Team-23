<template>
	<!-- <div v-for="(column, idx) in workspace.columns" :key="idx" ref="column" class="column" v-bind:id="column.id"> -->
	<div class="column">
		<div class="column__header">
			<input class="column__input" type="text" v-model="colTitle" v-on:keyup="saveWorkspace">
			<!-- <slot></slot>

			<p>{{colTitle}}</p> -->

			<div class="dropdown-menu">
				<button v-on:click="toggleDropDown($event)"><i class="fas fa-ellipsis-v"></i></button>
				<div class="dropdown">
					<span class="dropdown__arrow"></span>
					<div class="dropdown__body">
						<button v-on:click="deleteColumn($event)"><i class="fas fa-trash"></i> Delete</button>
					</div>
				</div>
			</div>
		</div>

		<div class="column-items">
			<!-- <Item v-for="(item, idx) in column.itemIDs" :key="idx" v-bind:color="workspace.color" v-bind:id="item.id" v-bind:content="item.content" v-bind:height="item.height">
				<input class="item__input" type="text" v-model="item.title" v-on:keyup="saveWorkspace">
			</Item> -->
		</div>

		<div class="column__add-item">

			<button class="" v-on:click="toggleAddItemDropdown($event)"><i class="fa fa-plus"></i></button>

			<div class="add-item-dropdown">
				<button class="add-item-btn" v-on:click="addItem($event, 'text')"><i class="fa fa-font"></i> Text</button>
			</div>

		</div>
	</div>
</template>

<script>
	import firebase from 'firebase'
	import db from '../components/firebaseInit'
	import Item from '../components/Item'

	export default {
		props: [
			'title'
		],
		data () {
			return {
				colTitle: ''
			}
		},
		created () {
      this.colTitle = this.title
    },
		methods: {
			saveWorkspace () {
        db.collection('workspaces').doc(this.$route.params.id).set(this.workspace)
      },
		},
		components: {
			Item
		}
	}
</script>
