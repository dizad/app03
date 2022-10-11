<template>
<div><!--empty div required to contain component-->
<!--title-->
<v-toolbar dark style='border-radius:0px; background-color: #1755d0'>
    <span class='dizagara-header'>ABR</span>
</v-toolbar>
<!--content-->
<v-toolbar small dense dark 
    style='border-radius:0px; background-color: rgb(1, 49, 137); border-top: 1px solid black; height: 50px;'>
    <v-toolbar-items style='margin-left: -15px; margin-top: 5px;'>
    <!--home-->
        <v-btn small dense class='dizagara-banner-button dizagara-outline-blue' style='height: 30px !important;' @click='redirect("home")'>
            <span :class="getIcon('home')"></span>
            HOME
        </v-btn>
    <!--regions-->
        <span v-for='(a, ai) in regions' :key='ai'>
            <v-btn small dense class='dizagara-banner-button dizagara-outline-blue' style='height: 30px !important;' @click='redirect("region", a)'>
                <span :class="getIcon('region')"></span>
                {{a}}
            </v-btn>
        </span>
    </v-toolbar-items>
</v-toolbar>
 </div>
</template>
<script>
//imports
	import bridge from '../bridge.js';
    import references from '../utils/references.js';
//master
	export default {
//name
	name: 'banner',
//components
	components: {
	},
//cycle methods
//created
    async created(){
    //fetch data
        let fishes = await bridge.gofish({key: 'abrradiology'}) || [];
    //build data
        fishes.forEach(a => {
            if(a.NOAAFisheriesRegion){
            //exists
                if(this.data[a.NOAAFisheriesRegion]){
                    this.data[a.NOAAFisheriesRegion].calories += a.Calories && this.numerifyCat(a.Calories) || 0;
                    this.data[a.NOAAFisheriesRegion].fat += a.FatTotal && this.numerifyFat(a.FatTotal) || 0;
                    this.addFish(a);
                }
            //doesn't exist
                else{
                    this.data[a.NOAAFisheriesRegion] = {
                        calories: a.Calories && this.numerifyCat(a.Calories) || 0,
                        fat: a.FatTotal && this.numerifyFat(a.FatTotal) || 0,
                        fishes: {}
                    };
                    this.addFish(a);
                }
            }
        });
    //get the region buttons
        this.regions = Object.keys(this.data).sort((a, b) => a.localeCompare(b));
    //set the store
        this.$store.commit("setData", this.data);
	},
//custom methods
    methods: {
    //get icon
		getIcon(icon){
			return `mdi ${references.getIcon(icon)}`;
		},
    //numerify cat
		numerifyCat(value){
			return Number(value);
		},
	//numerify fat
		numerifyFat(value){
			return Number(value.replace('g', '').trim())
		},
    //add fish
		addFish(doc){
			if(doc.SpeciesName){
			//exists
				if(this.data[doc.NOAAFisheriesRegion].fishes[doc.SpeciesName]){
					this.data[doc.NOAAFisheriesRegion].calories += doc.Calories && this.numerifyCat(doc.Calories) || 0;
				}
			//doesn't exist
				else {
					this.data[doc.NOAAFisheriesRegion].fishes[doc.SpeciesName] = {
						name: doc.SpeciesName,
						image: doc.SpeciesIllustrationPhoto || {},
						description: doc.PhysicalDescription || 'n/a'
					};
					this.data[doc.NOAAFisheriesRegion].fishes[doc.SpeciesName].calories = doc.Calories && this.numerifyCat(doc.Calories) || 0;
				}
			}
		},
    //redirect           
        redirect(page, prop){
        //get path
            let path = ``;
            if(prop){
                path = `/${page}/${prop}`;
            }else{
                path = `/${page}`;
            }
        //redirect
            if(this.$route.path != path) {
                this.$router.push({path: path});
            }
        },
    },
//global vars
	data: global => ({
        data: {},
        regions: []
    })
}
</script>