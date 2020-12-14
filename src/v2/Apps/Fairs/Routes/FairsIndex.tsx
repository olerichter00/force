import {
  Box,
  Button,
  Column,
  GridColumns,
  space,
  Tab,
  Tabs,
  Text,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { NAV_BAR_HEIGHT } from "v2/Components/NavBar"
import { Media } from "v2/Utils/Responsive"
import { FairsIndex_featuredFairs } from "v2/__generated__/FairsIndex_featuredFairs.graphql"
import { FairsIndex_viewer } from "v2/__generated__/FairsIndex_viewer.graphql"
import { FairsFairBannerFragmentContainer } from "../Components/FairsFairBanner"
import { FairsFairRowFragmentContainer } from "../Components/FairsFairRow"
import { FairsPhonePromo } from "../Components/FairsPhonePromo"

interface FairsIndexProps {
  featuredFairs: FairsIndex_featuredFairs
  viewer: FairsIndex_viewer
}

export const FairsIndex: React.FC<FairsIndexProps> = ({
  featuredFairs,
  viewer,
}) => {
  const { runningFairs, closedFairs, upcomingFairs } = viewer

  const bannerFairs = [
    ...runningFairs.filter(
      fair =>
        fair.isPublished &&
        fair.profile?.isPublished &&
        fair.bannerSize === "x-large"
    ),
    ...runningFairs.filter(
      fair =>
        fair.isPublished &&
        fair.profile?.isPublished &&
        fair.bannerSize !== "x-large"
    ),
  ]

  return (
    <>
      {/* TODO: Meta tags */}

      <Media lessThan="sm">
        <Text as="h1" variant="largeTitle" my={3} textAlign="center">
          Collect from leading art fairs on Artsy
        </Text>

        <Box my={3}>
          <Tabs>
            <Tab name="Current">
              {bannerFairs.map(fair => (
                <FairsFairRowFragmentContainer
                  key={fair.internalID}
                  fair={fair}
                />
              ))}
            </Tab>

            <Tab name="Upcoming">
              {upcomingFairs.map(fair => (
                <FairsFairRowFragmentContainer
                  key={fair.internalID}
                  fair={fair}
                />
              ))}
            </Tab>

            <Tab name="Past">
              {closedFairs.map(fair => (
                <FairsFairRowFragmentContainer
                  key={fair.internalID}
                  fair={fair}
                />
              ))}
            </Tab>
          </Tabs>
        </Box>
      </Media>

      <Media greaterThanOrEqual="sm">
        <Box my={3}>
          <Text as="h1" variant="largeTitle" my={1}>
            Current Events
          </Text>

          <GridColumns my={1}>
            {bannerFairs.map(fair => {
              return (
                <Column
                  key={fair.internalID}
                  span={fair.bannerSize === "x-large" ? 12 : 6}
                >
                  <FairsFairBannerFragmentContainer fair={fair} />
                </Column>
              )
            })}

            <Column span={6}>
              <FairsPhonePromo pt={2} />
            </Column>
          </GridColumns>
        </Box>

        <GridColumns my={3}>
          <Column span={7}>
            <Text
              as="h3"
              variant="largeTitle"
              pb={1}
              borderBottom="1px solid"
              borderColor="black10"
            >
              Past Events
            </Text>

            <Box mb={3}>
              {closedFairs.map(fair => {
                if (!fair.isPublished && !fair.profile?.isPublished) return null

                return (
                  <FairsFairRowFragmentContainer
                    key={fair.internalID}
                    fair={fair}
                  />
                )
              })}
            </Box>

            <Button variant="secondaryOutline" block width="100%">
              View more
            </Button>
          </Column>

          <Column start={9} span={4}>
            <Box position="sticky" top={NAV_BAR_HEIGHT + space(1)}>
              <Text
                as="h3"
                variant="largeTitle"
                pb={1}
                borderBottom="1px solid"
                borderColor="black10"
              >
                Upcoming Events
              </Text>

              {upcomingFairs.map(fair => {
                if (!fair.isPublished && !fair.profile?.isPublished) return null

                return (
                  <Text key={fair.internalID} my={3}>
                    <RouterLink to={fair.href}>{fair.name}</RouterLink>

                    <Box>
                      {fair.startAt} – {fair.endAt}
                    </Box>

                    {fair.location && <Box>{fair.location.city}</Box>}
                  </Text>
                )
              })}
            </Box>
          </Column>
        </GridColumns>
      </Media>
    </>
  )
}
export const FairsIndexFragmentContainer = createFragmentContainer(FairsIndex, {
  featuredFairs: graphql`
    fragment FairsIndex_featuredFairs on OrderedSet @relay(plural: true) {
      items {
        ... on FeaturedLink {
          title
          subtitle
          image {
            url(version: "large_rectangle")
          }
        }
      }
    }
  `,
  viewer: graphql`
    fragment FairsIndex_viewer on Viewer {
      runningFairs: fairs(
        hasListing: true
        hasFullFeature: true
        sort: START_AT_DESC
        size: 25
        status: RUNNING
      ) {
        internalID
        bannerSize
        isPublished
        profile {
          isPublished
        }
        ...FairsFairBanner_fair
        ...FairsFairRow_fair
      }
      closedFairs: fairs(
        hasListing: true
        hasFullFeature: true
        sort: START_AT_DESC
        size: 25
        status: CLOSED
      ) {
        internalID
        isPublished
        profile {
          isPublished
        }
        ...FairsFairRow_fair
      }
      upcomingFairs: fairs(
        hasListing: true
        hasFullFeature: true
        sort: START_AT_ASC
        size: 25
        status: UPCOMING
      ) {
        internalID
        name
        href
        startAt(format: "MMM Do")
        endAt(format: "Do YYYY")
        location {
          city
        }
        isPublished
        profile {
          isPublished
        }
        ...FairsFairRow_fair
      }
    }
  `,
})
