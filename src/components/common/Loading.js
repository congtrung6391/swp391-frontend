import React from 'react';
import PropTypes from 'prop-types';
import CenterContainer from '../basic/CenterContainer';
import HorizontalContainer from '../basic/HorizontalContainer';
import Body from '../basic/Body';
import NavigationBar from './NavigationBar';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export const LoadingInterwind = () => (
  <div class="loadingio-spinner-interwind-kf4315nhojd"><div class="ldio-h51982wfzh">
<div><div><div><div></div></div></div><div><div><div></div></div></div></div>
</div></div>
)

export const Loading = ({ className }) => (
  <CenterContainer style={{ height: '100%' }} className={className}>
    <span className="fas fa-spin fa-spinner m-auto" style={{ verticalAlign: 'middle' }} />
  </CenterContainer>
);
Loading.propTypes = {
  className: PropTypes.string,
};
Loading.defaultProps = {
  className: '',
};

export const Loading3X = ({ className }) => (
  <CenterContainer className={className}>
    <span className="fas fa-spin fa-spinner fa-3x" />
  </CenterContainer>
);
Loading3X.propTypes = {
  className: PropTypes.string,
};
Loading3X.defaultProps = {
  className: '',
};

export const LoadingDNA3X = () => (
  <Box
    display="flex"
    flexDirection="row"
    justifyContent="center"
    alginItems="center"
  >
    {/* <Typography>Loading...</Typography> */}
    <div class="wrap-loading">
      <div class="one-loading common-loading"></div>
      <div class="two-loading common-loading"></div>
      <div class="three-loading common-loading"></div>
      <div class="four-loading common-loading"></div>
      <div class="box-loading">
          <div class="circle-loading"></div>
      </div>
    </div>
  </Box>
);

export const LoadingDNA = () => (
  <CenterContainer>
    <img alt="loading..." src="./loading-dna.svg" style={{ height: '50px' }} />
  </CenterContainer>
);

export const LoadingPage = () => (
  <>
    <NavigationBar
      nav={[['', '']]}
    />
    <Body>
      <div className="col-12">
        <CenterContainer>
          <LoadingDNA3X />
        </CenterContainer>
      </div>
    </Body>
  </>
);
