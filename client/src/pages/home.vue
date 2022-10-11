<template>
<v-app>
<!--banner bar-->
	<banner class='no-print'></banner>
<!--title-->
	<v-card class='dizagara-banner-bar'>
		<div style='color: white; text-align: center; margin-top: 10px;' >
			<strong style='font-size: 18px;'>HOME</strong>
		</div>
	</v-card>
<!--content-->
	<span style='overflow-y: auto; height: calc(100vh - 150px)' class='dizagara-night-level-02'>
	<v-row class='dizagara-night-level-02'>
	<!--table-->
		<v-simple-table dark class='dizagara-night-level-02'
		style='margin: 20px; padding-bottom: 20px;'>
		<template v-slot:default>
		<!--header-->
			<thead>
				<tr>
					<th class='text-center' style='width: calc(33vw);'>
						Regions
					</th>
					<th class='text-center' style='width: calc(33vw);'>
						Calories (c)
					</th>
					<th class='text-center' style='width: calc(33vw);'>
						Fat (g)
					</th>
				</tr>
			</thead>
		<!--body-->
			<tbody>
				<tr v-for='(a, ai) in Object.keys(data)' :key='ai' class='dizagara-label-02'>
					<td class='text-center'>
						{{a}}
					</td>
					<td class='text-center'>
						{{roundToTwo(data[a].calories)}}
					</td>
					<td class='text-center'>
						{{roundToTwo(data[a].fat)}}
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
			this.data = utils.deepClone(this.$store.getters.getData);
			
		},
	//methods
		methods: {
		//get icon
			getIcon(icon){
				return `mdi ${references.getIcon(icon)}`;
			},
		//round
			roundToTwo(value){
				return utils.roundToTwo(value);
			}
		},
//global
	data: global => ({
		data: {}
	})
}
</script>