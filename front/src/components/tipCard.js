import React, { Component } from "react";
import styled, { css } from "styled-components";
import {
  Box,
  Button,
  Text,
  ThemeContext
} from "grommet";

import { Favorite } from "grommet-icons";

import Link from './localizedLink'

const filledIcon = css`
  path[fill="none"] {
    fill: ${props => props.theme.colors["dark-4"]};
  }
`;

const CardFavorite = styled(Favorite)`
  ${props => (props.checked ? filledIcon : "")}
`;

// notice that this is not named Card.
// it is not generic. it is a card that works well for restaurant reviews
// the implementation is quite simple, so converting this to anything else is really easy
class TipCard extends Component {
  state = {
    showReviews: false
  };
  renderCardHeader = () => {
    const { tip } = this.props;
    return (
      <Box background='white' pad={{ horizontal: "small" }} style={{zIndex: 1}}>
          <Link to={`/${tip.slug}`}>
          <Box 
            pad={{ vertical: 'small' }}
          >
        <Text
          size="medium"
          color="dark-2"
          truncate
        >
            {tip.title}
        </Text>
          </Box>
          </Link>
      </Box>
    );
  };
  renderCardFooter = () => {
    const { onClickFavorite, tip } = this.props;
    return (
      <ThemeContext.Consumer>
        {theme => (
          <Box
            tag="footer"
            direction="row"
            align="center"
            justify="between"
            pad={{ left: "small", vertical: "small" }}
          >
            {onClickFavorite && (
              <Button
                margin={{ right: "small" }}
                a11yTitle={`Favorite ${tip.title}`}
                onClick={onClickFavorite}
              >
                <Box>
                  <CardFavorite
                    theme={theme.icon}
                    checked={tip.favorite}
                  />
                </Box>
              </Button>
            )}
          </Box>
        )}
      </ThemeContext.Consumer>
    );
  };
  render() {
    const { tip = {}, onClickFavorite, ...rest } = this.props;
    return (
      <Box round="xxsmall" elevation="small" overflow="hidden" {...rest}>
        <Box height="small">
          <Link to={`/${tip.slug}`}>
            {tip.image}
          </Link>
        </Box>
        {this.renderCardHeader()}

        {(onClickFavorite) && this.renderCardFooter()}
      </Box>
    );
  }
}

export default TipCard

