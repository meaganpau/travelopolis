import { injectGlobal } from 'emotion';

const Global = 
    injectGlobal`
      * {
        box-sizing: border-box;
      }
    
      html, input {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 16px;
        line-height: 1.5;
        color: #4a4a4a;
        font-family: 'Futura', 'Avenir Next', 'Helvetica Neue', sans-serif;
      }
    
      body {
        margin: 0;
        padding: 0;
      }
    
      @font-face {
        font-family: 'Futura';
        src: local('Futura-Bold'),
          url(./fonts/Futura-Bold.eot?#iefix) format('embedded-opentype'),
          url(./fonts/Futura-Bold.woff) format('woff'),
          url(./fonts/Futura-Bold.ttf)  format('truetype'),
          url(./fonts/Futura-Bold.svg#webfont) format('svg');
        font-weight: bold;
      }
    
      @font-face {
        font-family: 'Futura';
        src: local('Futura-Medium'),
          url(./fonts/Futura-Medium.eot?#iefix) format('embedded-opentype'),
          url(./fonts/Futura-Medium.woff) format('woff'),
          url(./fonts/Futura-Medium.ttf)  format('truetype'),
          url(./fonts/Futura-Medium.svg#webfont) format('svg');
        font-weight: 500;    
      }
  `

export default Global;