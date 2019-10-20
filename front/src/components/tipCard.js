import React, { Component } from "react";
import styled, { css } from "styled-components";
import {
  Box,
  Layer,
  Button,
  Paragraph,
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
              pad={{ vertical: 'large' }}
            >
              <Text
                size="large"
                color="dark-2"
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
        <Box style={{ position: 'relative' }}>
          <Box>
            <Link to={`/${tip.slug}`}>
              {tip.image}
            </Link>
          </Box>
          {/*<Box style={{ position: 'absolute', bottom: '0' }} align='left' margin={{ left: 'large' }} justify='end'>
            <Paragraph>
              <Text style={{ 
                boxShadow: '0 0 0 10px rgba(255, 255, 255, .9)',
                backgroundColor: 'rgba(255, 255, 255, .9)',
                boxDecorationBreak: 'clone',
                lineHeight: 2.5,
              }} size='large' >
                {tip.title}
              </Text>
            </Paragraph>
          </Box>*/}
        </Box>
        {this.renderCardHeader()}

        {(onClickFavorite) && this.renderCardFooter()}
      </Box>
    );
  }
}

export default TipCard

