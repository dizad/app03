<template>
<v-app>
<!--banner bar-->
	<banner class='no-print'></banner>
<!--title-->
	<v-card class='dizagara-banner-bar'>
		<div style='color: white; text-align: center; margin-top: 10px;' >
			<strong style='font-size: 18px;'>{{region.toUpperCase()}}</strong>
		</div>
	</v-card>
<!--content-->
	<span style='overflow-y: auto; height: calc(100vh - 150px)' class='dizagara-night-level-02'>
	<v-row class='dizagara-night-level-02'>
		<!--calories-->
			{{data.calories}}
		<!--fat-->
			{{data.fat}}
		<!--fishes-->
		<v-simple-table dark class='dizagara-night-level-02'
			style='margin: 20px; padding-bottom: 20px;'>
			<template v-slot:default >
		<!--header-->
			<thead>
				<tr>
					<th class='text-center' style='width: calc(20vw);'>
						Image
					</th>
					<th class='text-center' style='width: calc(10vw);'>
						Fish
					</th>
					<th class='text-center' style='width: calc(10vw);'>
						Calories
					</th>
					<th class='text-center' style='width: calc(60vw);'>
						Description
					</th>
				</tr>
			</thead>
		<!--body-->
			<tbody>
				<tr v-for='(a, ai) in headers' :key='ai' class='dizagara-label-02'>
					<td class='text-center'>
						<img :src='data.fishes[a].image.src' style='height: 50px;' :title='data.fishes[a].image.title || "n/a"' :alt='data.fishes[a].image.alt'/>
					</td>
					<td class='text-left'>
						{{a}}
					</td>
					<td class='text-center'>
						{{data.fishes[a].calories}}
					</td>
					<td class='text-left'>
						<small v-html="data.fishes[a].description"></small>
					</td>
				</tr>
			</tbody>
		</template>
		</v-simple-table>
	</v-row>
</span>
</v-app>
</template>
<script>
//import
	import banner from '../components/banner.vue';
	import references from '../utils/references.js';
	import utils from '../utils/utils.js';
//master
	export default {
//name
	name: 'dashboard',
//components
  components: {
	banner
  },
//cycle methods
	//created
		async created(){
			this.region = this.$route.params.prop;
			this.data = utils.deepClone(this.$store.getters.getRegion(this.region));
			this.headers = Object.keys(this.data.fishes).sort((a, b) => a.localeCompare(b));
		},
	//methods
   methods: {
	//get icon
		getIcon(icon){
			return `mdi ${references.getIcon(icon)}`;
		},
	},
//global
	data: global => ({
		data: {},
		region: ''
	})
}
</script>