import React, { Component } from "react";
import styled, { css } from "styled-components";
import {
  Box,
  Text
} from "theme-ui";

import Link from './localizedLink'

export default ({ tip }) => (
  <Box>
    <Box>
      <Box>
        <Link to={`/${tip.slug}`}>
          {tip.image}
        </Link>
      </Box>
    </Box>
    <Box>
      <Link to={`/${tip.slug}`}>
        <Box >
          <Text>
            {tip.title}
          </Text>
        </Box>
      </Link>
    </Box>
  </Box>
)
