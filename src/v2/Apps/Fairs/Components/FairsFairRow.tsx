import { Box, BoxProps, ChevronIcon, color, Image, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { FairsFairRow_fair } from "v2/__generated__/FairsFairRow_fair.graphql"

const Container = styled(Box)`
  transition: background-color 250ms;

  &:hover {
    background-color: ${color("black5")};
  }
`

interface FairsFairRowProps extends BoxProps {
  fair: FairsFairRow_fair
}

const FairsFairRow: React.FC<FairsFairRowProps> = ({ fair, ...rest }) => {
  const icon = fair?.profile?.icon?.resized

  return (
    <RouterLink
      to={fair.href}
      style={{ display: "block", textDecoration: "none" }}
    >
      <Container
        display="flex"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="black10"
        py={2}
        px={[0, 2]}
        {...rest}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={80}
          height={80}
          mr={3}
        >
          {icon ? (
            <Image
              width={icon.width}
              height={icon.height}
              src={icon.src}
              srcSet={icon.srcSet}
              alt={fair.name}
            />
          ) : (
            <Box width={60} height={60} bg="black10" borderRadius="50%" />
          )}
        </Box>

        <Text as="h4" mr={3} display="flex" flex={1}>
          {fair.name}
        </Text>

        <Text as="h4" display="flex" flex={1}>
          {fair.startAt} – {fair.endAt}
        </Text>

        <ChevronIcon direction="right" fill="black60" />
      </Container>
    </RouterLink>
  )
}

export const FairsFairRowFragmentContainer = createFragmentContainer(
  FairsFairRow,
  {
    fair: graphql`
      fragment FairsFairRow_fair on Fair {
        href
        name
        startAt(format: "MMM Do")
        endAt(format: "Do YYYY")
        profile {
          icon {
            resized(width: 80, height: 80, version: "square140") {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
