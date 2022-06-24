
/****** Rate it rules *****/

.rateit {
    display: -moz-inline-box;
    display: inline-block;
    position: relative;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
}



/*.rateit .rateit-range * {
    display:block;
}*/

/* for IE 6 */
* html .rateit, * html .rateit .rateit-range
{
    display: inline;
}

/* for IE 7 */
* + html .rateit, * + html .rateit .rateit-range
{
    display: inline;
}

.rateit .rateit-hover, .rateit .rateit-selected
{
    position: absolute;
    left: 0px;
}

.rateit .rateit-range
{
    position: relative;
    display: -moz-inline-box;
    display: inline-block;
    background: url(http://112.140.186.56/wp-content/plugins/yet-another-stars-rating-pro/img/stars/1_yasr_default/stars_16.png ) left 0px;
    height: 16px;
    width: 16px;
    outline: none;
    vertical-align: -2px;
}

.rateit .rateit-hover
{
    background: url(http://112.140.186.56/wp-content/plugins/yet-another-stars-rating-pro/img/stars/1_yasr_default/stars_16.png ) left -21px;
}

.rateit .rateit-selected
{
    background: url(http://112.140.186.56/wp-content/plugins/yet-another-stars-rating-pro/img/stars/1_yasr_default/stars_16.png ) left -42px;
}


.rateit .rateit-hover-rtl, .rateit .rateit-selected-rtl
{
    left: auto;
    right: 0px;
}

.rateit .rateit-hover-rtl
{
    background-position: right -16px;
}

.rateit .rateit-selected-rtl
{
    background-position: right -32px;
} 

/*
IMAGES BY: Oxygen Team
*/

/* Creating set 24px image . */

div.medium .rateit-range
{
    /*White*/
    background: url(http://112.140.186.56/wp-content/plugins/yet-another-stars-rating-pro/img/stars/1_yasr_default/stars_24.png ) left 0px;
    width: 24px; 
    height: 24px;
}

div.medium .rateit-hover
{
    /*Red*/
    background: url(http://112.140.186.56/wp-content/plugins/yet-another-stars-rating-pro/img/stars/1_yasr_default/stars_24.png ) left -29px;
    width: 24px; 
    height: 24px;
    display: none

}

div.medium .rateit-selected
{
    /*Yellow*/
    background: url(http://112.140.186.56/wp-content/plugins/yet-another-stars-rating-pro/img/stars/1_yasr_default/stars_24.png ) left -58px ;
    width: 24px; 
    height: 24px;
}

/* Creating set 32 */

div.bigstars .rateit-range
{
    /*White*/
    background: url(../wp-content/plugins/yet-another-stars-rating-pro/img/stars/1_yasr_default/stars_32.png ) left 0px ; 
    width: 32px; 
    height: 32px;
}

div.bigstars .rateit-hover
{
    /*red*/
    background: url(../wp-content/plugins/yet-another-stars-rating-pro/img/stars/1_yasr_default/stars_32.png ) left -37px ; 
    width: 32px; 
    height: 32px;
    display: none
}

div.bigstars .rateit-selected
{
    /*Gold*/
    background: url(../wp-content/plugins/yet-another-stars-rating-pro/img/stars/1_yasr_default/stars_32.png ) left -74px ; 
    width: 32px; 
    height: 32px;
}


.rateit button.rateit-reset
{
    background: url('../img/delete.gif') 0 0;
    width: 16px;
    height: 16px;
    display: -moz-inline-box;
    display: inline-block;
    float: left;
    outline: none;
    border:none;
    padding: 0;
}

.rateit button.rateit-reset:hover, .rateit button.rateit-reset:focus
{
    background-position: 0 -16px;
}

/****** End rateit rules ******/