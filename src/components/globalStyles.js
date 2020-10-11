import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    
  }
  #rightBar #search svg{
    color: ${({ theme }) => theme.text}
  }
  #rightBar #search{
    background-color: ${({ theme }) => theme.divBackground}
  }
  #rightBar #search input{
    color: ${({ theme }) => theme.text}
  }
  #rightBar #trending{
    background-color: ${({ theme }) => theme.divBackground}
  }
  #rightBar #trending #trendingHastag p:first-of-type,
#rightBar #trending #trendingHastag p:nth-of-type(3){
  color: ${({ theme }) => theme.lightWhite}
}
#rightBar #trending #trendingHastag:hover {
  background-color: ${({ theme }) => theme.twitterColor}
}
#rightBar #trending #follow > div > div p:nth-of-type(2){
  color: ${({ theme }) => theme.lightWhite}
}
#rightBar #trending #follow button{
  border-color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.twitterColor};
  color: ${({ theme }) => theme.text};
}
#rightBar #footer a{
  color: ${({ theme }) => theme.lightWhite}
}
#rightBar #searchDropdown {
  background-color: ${({ theme }) => theme.divBackground};
   box-shadow: 0 0 4px rgba(138, 138, 138, 0.75);
}
#rightBar #searchDropdown a{
  color: ${({ theme }) => theme.text}!important;
}
#leftBar a{
  color: ${({ theme }) => theme.text}
}
#leftBar > div:hover{
  background-color:${({ theme})=>theme.hover} ;
}
#leftBar div:nth-of-type(10){
  color: ${({ theme }) => theme.body}
}
#createTweetModal #footer button{
  background-color: ${({ theme }) => theme.twitterColor};
  color: ${({ theme }) => theme.text};
}
#logoutModal #heading div p:nth-of-type(2){
  color: ${({ theme }) => theme.lightWhite}
}
#createTweet #icons button{
  background-color: ${({ theme }) => theme.twitterColor};
  color: ${({ theme }) => theme.text};
}
.tweet,#createTweet{
  border:1px solid ${({ theme }) => theme.border};
}

.tweet .content .icons, .tweet .content .name > div svg{
  color: ${({ theme }) => theme.lightWhite}
}
.ReactModal__Overlay{
  background-color: ${({ theme }) => theme.body} !important;
}
#editTweet #buttons button:first-of-type,
#editTweet #buttons button:nth-of-type(2),
#deleteTweet #buttons button:first-of-type,
#deleteTweet #buttons button:nth-of-type(2){
  background-color: ${({ theme }) => theme.twitterColor};
  color: ${({ theme }) => theme.text};
}
#createTweet #tweetingSection textarea{
  background-color: ${({ theme }) => theme.divBackground};
  color: ${({ theme }) => theme.text};
  border-radius:10px;
  padding-left:10px;
}
.dropdown-toggle::after{
  color: ${({ theme }) => theme.body}
}
.tweet .content .name .btn-primary:hover{
  background-color: ${({ theme }) => theme.divBackground} !important;
}
.tweet .content .name .dropdown-menu{
  background-color: ${({ theme }) => theme.divBackground} !important;
  color: ${({ theme }) => theme.text} !important;
}
.tweet .content .name .dropdown-item{
  color: ${({ theme }) => theme.text} !important;
}
.tweet .content .name .dropdown-item:hover{
  background-color: ${({ theme }) => theme.body};
}
#editTweet, #deleteTweet {
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body}
}
#editTweet #content textarea {
  background-color: ${({ theme }) => theme.divBackground};
  color: ${({ theme }) => theme.text};
}
#imagePreview svg{
  color: ${({ theme }) => theme.twitterColor}
}
#notifications #content{
  color: ${({ theme }) => theme.text}
}
#alanCommands{
  border:1px solid ${({ theme})=>theme.border}
}
#alanCommands .commands p{
  background-color: ${({ theme }) => theme.divBackground}
}
#profile #image button{
  background-color: ${({ theme }) => theme.twitterColor};
  color: ${({ theme }) => theme.text};
}
#profile #info > p:first-of-type{
  color: ${({ theme }) => theme.text};
}
#profile #info > p:nth-of-type(2),#profile #info #dates,#profile #info #followers,#profile #myTweets > div{
  color: ${({ theme }) => theme.lightText};
}
  `;
