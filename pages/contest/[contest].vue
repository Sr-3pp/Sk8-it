<script setup lang="ts">
const route = useRoute()
const { getContest } = useContest()
const { data: contest } = await getContest(route.params.contest as string)
const { toCurrency } = useCurrency()
</script>

<template lang="pug">
.contest
    Banner(:picture="`/blob/${contest.banner}`")
        h1 {{ contest.name }}
        .banner__content
            p {{ contest.date }}
            p {{ toCurrency(contest.cost) }}
    Container(:withPadding="true")
        ContestPodium(v-if="contest.podium" :podium="JSON.parse(contest.podium)")

        p {{ contest.description }}

        ContestPrizeList(:prizes="contest.prizes.split(',')")
        ContestParticipants(v-if="contest.participants.length" :participants="contest.participants")

    .contest__location
        Container
            .contest__location__content
                h2 Location
                p {{ contest.address }}
        ClientOnly
            LMap.sk-geocoder__map(
                ref="map"
                :zoom="16"
                :center="contest.latlng.split(',')"
                :use-global-leaflet="false"
            )
                LMarker(v-if="contest.latlng" :lat-lng="contest.latlng.split(',')")
                LTileLayer(
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&amp;copy; link contributors"
                    layer-type="base"
                    name="OpenStreetMap"
                )
</template>

<style lang="scss">
.contest{
    .sk-geocoder__map{
        height: unit(300)!important;
        z-index: 80;
    }

    .banner{
        &__img{
            max-height: unit(500);
        }

        &__caption{
            justify-content: flex-end;

            h1{
                margin: 0;
            }
        }

        &__content{
            display: flex;
            justify-content: space-between;
            gap: unit(40);
            font-size: unit(20);
            font-weight: bold;
        }
    }

    &__location{
        position: relative;
        display: flex;
        flex-direction: column;

        .container{
            z-index: 90;

            &__content{
                --color: #{$color-board};
                --size: #{unit(20)};
                position: relative;
            }
        }

        &__content{
            box-shadow: 0 0 unit(20) rgba(0, 0, 0, 0.8);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 200;
            background-color: $color-board;
            display: flex;
            flex-direction: column;
            gap: unit(20);
            font-size: unit(20);
            padding: unit(20);
            width: 50%;
            max-width: unit(400);
            border-bottom-right-radius: unit(20);
            border-bottom-left-radius: unit(20);

            &::after{
                @include invertedRadius('rotate(270deg)');
                top: 0;
                left: 100%;
            }
            
            &::before{
                @include invertedRadius('rotate(180deg)');
                top: 0;
                right: 100%;
            }
        }
    }
}
</style>