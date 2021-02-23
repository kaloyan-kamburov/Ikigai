import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context";
import Slider from "react-slick";
import Image from "../../images/pixeltrue-meditation.png";
import ImageVision from "../../images/pixeltrue-vision.png";
import ImageIkigai from "../../images/ikigaiChart.png";
import ImageIkigaiEx from "../../images/ikigaiEx.png";

const Home = () => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useContext(UserContext);
  const [logged, setLogged] = useState(false);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // useEffect(() => {
  //   sessionStorage.removeItem("step_A");
  //   sessionStorage.removeItem("step_B");
  //   sessionStorage.removeItem("step_C");
  //   sessionStorage.removeItem("step_D");
  // }, []);

  useEffect(
    () =>
      setLogged(
        userDetails &&
          userDetails.user &&
          !!Object.keys(userDetails.user).length
      ),
    [userDetails]
  );

  return (
    <>
      <section className="section">
        <div className="shell">
          <div className="section-content">
            <div className="section-head">
              <h1>Discover and realise your reason for being.</h1>
            </div>
            <div className="section-body">
              <h3>We will help you find a purpose you strongly believe in.</h3>
            </div>
            <div className="section-foot">
              <div className="section-btn">
                <button
                  className="btn-lg"
                  onClick={() => {
                    history.push(logged ? "/chart" : "/what-you-love");
                  }}
                >
                  {logged ? "View my Ikigai" : "Start Your Journey"}
                </button>
                <button className="btn-more">Learn more</button>
              </div>
            </div>
          </div>
          <div className="section-image">
            <img alt="Ikigai" src={Image} />
          </div>
        </div>
      </section>
      <section className="section-white">
        <div className="shell">
          <div className="section-intro">
            <h2>What is Ikify?</h2>
            {/* <p>Ikiguide is based on the japanese concept Ikigai that could help you discover a more meaningful life. It can be a great tool in many stages of your personal and professional life. </p> */}
            <p>
              Ikify helps you discover and realise your ikigai. Ikify can be a great tool in many stages of your personal and
              professional life.{" "}
            </p>
          </div>
          <div className="aside-wrapper">
            <aside className="aside-image">
              <img alt="Ikigai" src={ImageVision} />
            </aside>
            <aside className="aside-text">
              <div className="aside-head">
                <h3 className="aside-title">Take the next step</h3>
              </div>
              <div className="aside-content">
                <ul className="aside-list">
                  <li>
                    You are looking to change your career but don’t know which
                    career will bring you the most fulfillment and how to change
                    course.
                  </li>
                  <li>
                    You are between jobs and look for one that will give more
                    fulfillment and purpose.
                  </li>
                  <li>
                    You are stuck in the same daily routine and looking for more
                    purpose and excitement in your life.{" "}
                  </li>
                  <li>
                    You are just starting your career out of school or
                    university and looking for a job with meaning and purpose.
                  </li>
                  <li>
                    You are a group of friends or colleagues that want to work
                    on a project, but do not know where your interests overlap
                    and what project to undertake.
                  </li>
                </ul>
              </div>
              <div className="aside-foot">
                <button className="btn-view">View examples</button>
              </div>
            </aside>
          </div>
          <div className="aside-wrapper">
            <aside className="aside-text">
              <div className="aside-head">
                <h2>What is Ikigai?</h2>
              </div>
              <div className="aside-content">
                <p>
                  Ikigai is a Japanese concept that means “a reason for being”.
                  It is why you get up in the morning. The word refers to having
                  a direction or purpose in life that makes one’s life
                  worthwhile.{" "}
                </p>
                <p>
                  By discovering your ikigai you can focus on the things that
                  matter the most to you and get satisfaction and a sense of
                  meaning to your life. Ikigai could be related to your work,
                  but it could also be related to something outside work.{" "}
                </p>
                <p>Your ikigai could have many different expressions.</p>
                {/* <p>But, knowing your ikigai alone is not enough: ikigai is “purpose in action”. </p> */}
              </div>
              <div className="aside-head">
                <h3 className="aside-title">How it works</h3>
              </div>
              <div className="aside-content">
                <p>
                  Your ikigai lies in the interception of where what you love,
                  what you are good at, what the world needs and what you can be
                  paid for overlap.
                </p>
                <p>
                  We will help you visualise your ikigai in a Venn diagram by
                  asking you a series of questions. Then you would be able to
                  discover where your ikigai lies.{" "}
                </p>
              </div>
              <div className="aside-foot">
                <button
                  className="btn-small"
                  onClick={() => {
                    history.push(logged ? "/chart" : "/what-you-love");
                  }}
                >
                  {logged ? "View my Ikigai" : "Start your journey"}
                </button>
              </div>
            </aside>
            <aside className="aside-image image-chart">
              <img alt="Ikigai" src={ImageIkigai} />
            </aside>
          </div>
        </div>
      </section>
      <section className="section-slider">
        <div className="shell">
          <h2>See Ikigai in action</h2>

          <Slider {...sliderSettings}>
            <>
              <div className="slider-slide">
                <div className="slider-wrapper">
                  <div className="slider-image">
                    <img alt="Ikigai" src={ImageIkigaiEx} />
                  </div>
                  <div className="slider-content">
                    <div className="slider-title">
                      <h3>John</h3>
                    </div>
                    <div className="slider-text">
                      <p>
                        John is working as this and that. He is good in
                        something but lacks something else. Incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.{" "}
                      </p>
                    </div>
                    <div className="slider-title-result">
                      <h3>Result</h3>
                    </div>
                    <div className="slider-text">
                      <p>
                        By using Ikigai, John found a new way to combine his
                        skills and start a new NGO venture where he’ll be able
                        to earn his living by doing what he loves best, and make
                        the world a better place in the process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
            {/* <>
              <div className="slider-slide">
                <span style={{ color: "#000" }}>2</span>
              </div>
            </> */}
            {/* <>
              <div className="slider-slide">
                <span style={{ color: "#000" }}>3</span>
              </div>
            </> */}
          </Slider>
        </div>
      </section>

      <section className="bg-section">
        <div className="shell">
          <div className="bg-section-head">
            <h2>It’s time to begin your journey</h2>
          </div>
          <div className="bg-section-body">
            <h3>It takes only 5 minutes to start</h3>
          </div>
          <div className="bg-section-foot">
            <div className="section-btn">
              <button
                className="btn-small yellow"
                onClick={() => {
                  history.push(logged ? "/chart" : "/what-you-love");
                }}
              >
                {logged ? "View my Ikigai" : "Create your Ikigai"}
              </button>
            </div>
          </div>

          {/* <aside className="aside">
            <div className="aside-head">
              <h2>What is Ikigai?</h2>
            </div>
            <div className="aside-content">
              <p>
                Ikigai is a Japanese concept that means “a reason for being”.
                The word refers to having a direction or purpose in life, that
                which makes one’s life worthwhile. By discovering your Ikigai
                you can focus on the things that matter most, get satisfaction
                from your routine and a sense of meaning to your life.
              </p>
              <p>
                Is Ikigai for you? Absolutely. It can be a great tool in many
                stages of your personal and professional life.
              </p>
              <ul className="aside-list">
                <li>You don’t know what is the right career for you</li>
                <li>
                  You are stuck between jobs and look for something different
                </li>
                <li>Life has lost meaning and everyday is exactly the same</li>
              </ul>
            </div>
            <div className="aside-head">
              <h2>How it works</h2>
            </div>
            <div className="aside-content">
              <p>
                When we look for our ikigai, we can ask ourselves four questions
                and narrow down what we love to do, what we’re good at and how
                we can impact the world around us. By going through a short
                questionnaire you will find your Ikigai - it lies in the
                intersection where your passion, mission, vocation and
                profession meet.
              </p>
            </div>
            <div className="aside-foot">
              <button
                className="btn-small"
                onClick={() => {
                  history.push(logged ? "/chart" : "/what-you-love");
                }}
              >
                {logged ? "View my Ikigai" : "Start here"}
              </button>
              <button className="btn-viewExamples">View examples</button>
            </div>
            <svg
              // width="1791px"
              // height="1790px"
              viewBox="0 0 1791 1790"
              version="1.1"
              className="chart-bg"
            >
              <g
                id="Group-10"
                // transform="translate(-0.646973, 0.000000)"
                // fill="#FFFFFF"
              >
                <path
                  d="M896.156771,0 C1138.89162,4.45896677e-14 1343.08452,165.017673 1402.6718,388.989338 C1359.56389,377.517347 1314.27684,371.40553 1267.5623,371.40553 C1122.42014,371.40553 991.058218,430.405712 896.151718,525.730882 L896.155973,525.725 L893.303715,522.882047 C799.583041,430.177573 671.068349,372.577389 529.101349,371.423207 L524.751241,371.40553 C478.037015,371.40553 432.750261,377.517265 389.646973,388.984742 C449.229023,165.017673 653.421926,-4.45896677e-14 896.156771,0 Z"
                  id="1"
                  onClick={() => console.log("bla")}
                ></path>
                <path
                  d="M1267.5623,371.40553 C1314.2772,371.40553 1359.56459,377.517441 1402.66844,388.985239 C1414.13952,432.093587 1420.25124,477.380294 1420.25124,524.09447 C1420.25124,669.2367 1361.251,800.598685 1265.92575,895.505196 L1265.92487,895.493941 C1201.82976,831.681006 1121.31246,784.350217 1031.26627,760.394868 C1007.30892,670.34598 959.976341,589.826891 896.161771,525.730829 L896.151718,525.730882 C991.058218,430.405712 1122.42014,371.40553 1267.5623,371.40553 Z"
                  id="1-and-2"
                ></path>
                <path
                  d="M1528.77892,632.646973 C1771.51376,632.646973 1975.70667,797.664645 2035.29395,1021.63631 C1992.18603,1010.16432 1946.89898,1004.0525 1900.18445,1004.0525 C1755.04229,1004.0525 1623.68036,1063.05268 1528.77386,1158.37785 L1528.77812,1158.37197 L1525.92586,1155.52902 C1432.20519,1062.82455 1303.69049,1005.22436 1161.7235,1004.07018 L1157.37339,1004.0525 C1110.65916,1004.0525 1065.37241,1010.16424 1022.26912,1021.63171 C1081.85117,797.664645 1286.04407,632.646973 1528.77892,632.646973 Z"
                  id="2"
                  transform="translate(1528.781532, 895.512413) rotate(-270.000000) translate(-1528.781532, -895.512413) "
                ></path>
                <path
                  d="M1148.59085,778.178441 C1212.40386,842.273002 1259.73565,922.789796 1283.6935,1012.83609 C1240.58655,1001.3702 1195.29984,995.258476 1148.58565,995.258476 C1101.87148,995.258476 1056.58477,1001.3702 1013.47674,1012.84009 C1037.43531,922.790392 1084.76721,842.27324 1148.58046,778.178441 L1148.59085,778.178441 Z"
                  id="1-and-2-and-3"
                  transform="translate(1148.585122, 895.509266) rotate(-270.000000) translate(-1148.585122, -895.509266) "
                ></path>
                <path
                  d="M1267.55243,895.504674 C1314.26733,895.504674 1359.55472,901.616586 1402.65857,913.084383 C1414.12965,956.192732 1420.24137,1001.47944 1420.24137,1048.19361 C1420.24137,1193.33584 1361.24113,1324.69783 1265.91588,1419.60434 L1265.915,1419.59309 C1201.81989,1355.78015 1121.30259,1308.44936 1031.2564,1284.49401 C1007.29905,1194.44512 959.966471,1113.92604 896.151901,1049.82997 L896.141848,1049.83003 C991.048348,954.504857 1122.41027,895.504674 1267.55243,895.504674 Z"
                  id="2-and-3"
                  transform="translate(1158.191610, 1157.554507) rotate(-270.000000) translate(-1158.191610, -1157.554507) "
                ></path>
                <path
                  d="M896.131945,1264.26912 C1138.86679,1264.26912 1343.05969,1429.28679 1402.64697,1653.25846 C1359.53906,1641.78646 1314.25201,1635.67465 1267.53747,1635.67465 C1122.39532,1635.67465 991.033391,1694.67483 896.126892,1790 L896.131146,1789.99412 L893.278889,1787.15117 C799.558214,1694.44669 671.043522,1636.84651 529.076523,1635.69233 L524.726415,1635.67465 C478.012188,1635.67465 432.725434,1641.78638 389.622146,1653.25386 C449.204196,1429.28679 653.397099,1264.26912 896.131945,1264.26912 Z"
                  id="3"
                  transform="translate(896.134559, 1527.134559) rotate(-180.000000) translate(-896.134559, -1527.134559) "
                ></path>
                <path
                  d="M896.143434,1029.60732 C959.956442,1093.70189 1007.28824,1174.21868 1031.24609,1264.26497 C988.139132,1252.79908 942.85242,1246.68736 896.138238,1246.68736 C849.424063,1246.68736 804.137356,1252.79908 761.029324,1264.26897 C784.987889,1174.21928 832.319798,1093.70212 896.133043,1029.60732 L896.143434,1029.60732 Z"
                  id="2-and-3-and-4"
                  transform="translate(896.137706, 1146.938150) rotate(-180.000000) translate(-896.137706, -1146.938150) "
                ></path>
                <path
                  d="M743.453287,894.494804 C790.168187,894.494804 835.455573,900.606716 878.559421,912.074513 C890.030505,955.182862 896.142227,1000.46957 896.142227,1047.18374 C896.142227,1192.32597 837.141985,1323.68796 741.816731,1418.59447 L741.81586,1418.58322 C677.72075,1354.77028 597.20345,1307.43949 507.157255,1283.48414 C483.199901,1193.43525 435.867327,1112.91617 372.052757,1048.8201 L372.042704,1048.82016 C466.949204,953.494987 598.31113,894.494804 743.453287,894.494804 Z"
                  id="3-and-4"
                  transform="translate(634.092465, 1156.544637) rotate(-180.000000) translate(-634.092465, -1156.544637) "
                ></path>
                <path
                  d="M263.509799,631.622146 C506.244644,631.622146 710.437547,796.639819 770.024827,1020.61148 C726.916913,1009.13949 681.629867,1003.02768 634.915329,1003.02768 C489.773172,1003.02768 358.411246,1062.02786 263.504746,1157.35303 L263.509,1157.34715 L260.656743,1154.50419 C166.936069,1061.79972 38.421376,1004.19953 -103.545623,1003.04535 L-107.895731,1003.02768 C-154.609957,1003.02768 -199.896711,1009.13941 -243,1020.60689 C-183.417949,796.639819 20.7749535,631.622146 263.509799,631.622146 Z"
                  id="4"
                  transform="translate(263.512413, 894.487587) rotate(-90.000000) translate(-263.512413, -894.487587) "
                ></path>
                <path
                  d="M643.714551,777.159908 C707.527559,841.254469 754.859354,921.771263 778.817205,1011.81756 C735.710249,1000.35167 690.423537,994.239943 643.709355,994.239943 C596.995179,994.239943 551.708473,1000.35166 508.600441,1011.82156 C532.559006,921.771859 579.890915,841.254707 643.70416,777.159908 L643.714551,777.159908 Z"
                  id="3-and-4-and-1"
                  transform="translate(643.708823, 894.490734) rotate(-90.000000) translate(-643.708823, -894.490734) "
                ></path>
                <path
                  d="M743.463157,370.39566 C790.178057,370.39566 835.465443,376.507571 878.569291,387.975368 C890.040375,431.083717 896.152097,476.370424 896.152097,523.0846 C896.152097,668.22683 837.151855,799.588815 741.826602,894.495326 L741.82573,894.484071 C677.73062,830.671136 597.213321,783.340346 507.167125,759.384998 C483.209772,669.33611 435.877197,588.817021 372.062627,524.720958 L372.052574,524.721011 C466.959074,429.395842 598.321,370.39566 743.463157,370.39566 Z"
                  id="4-and-1"
                  transform="translate(634.102335, 632.445493) rotate(-90.000000) translate(-634.102335, -632.445493) "
                ></path>
                <path
                  d="M828.076973,1043.78406 L827.941206,1043.76656 L827.941206,1043.76656 L827.882973,1043.75806 L819.727973,1042.62906 L819.689973,1042.62406 L819.632973,1042.61506 L819.578973,1042.60706 L811.419138,1041.34476 L811.419138,1041.34476 L811.009973,1041.27606 L803.200973,1039.93706 L803.042973,1039.90906 L800.388578,1039.42608 C799.475166,1039.25709 798.562584,1039.08573 797.65084,1038.91201 L794.918155,1038.38378 L794.490973,1038.29806 L786.936973,1036.75206 L786.513021,1036.66382 L786.513021,1036.66382 L778.685973,1034.93106 L778.547973,1034.90006 L778.197973,1034.81906 L770.589973,1033.00606 L770.340973,1032.94506 L770.187973,1032.90706 L762.532973,1030.95306 L762.226245,1030.87328 L761.226772,1030.60843 C749.758884,987.502287 743.646973,942.2149 743.646973,895.5 C743.646973,848.783586 749.75928,803.494778 761.227796,760.389675 C804.337831,748.922404 849.623181,742.81106 896.335913,742.81106 C943.050094,742.81106 988.336806,748.922783 1031.44376,760.388674 C1042.91217,803.491975 1049.02485,848.78214 1049.02485,895.5 C1049.02485,942.212372 1042.9136,987.497386 1031.44701,1030.59914 C1028.53063,1031.38386 1025.60118,1032.13606 1022.66195,1032.86345 L1021.61197,1033.11906 L1014.53569,1034.80322 L1014.53569,1034.80322 L1013.22697,1035.10106 L1006.33465,1036.62449 L1006.33465,1036.62449 C1003.63092,1037.20208 1000.91948,1037.75881 998.200497,1038.29451 L998.201307,1038.2958 L997.250973,1038.47906 L989.848542,1039.86942 L989.848542,1039.86942 L988.996973,1040.02006 L981.597973,1041.28706 L981.497973,1041.30306 L978.766755,1041.74284 C976.909627,1042.03628 975.049261,1042.31997 973.18571,1042.59384 L973.185812,1042.59448 L972.802973,1042.64906 L964.868973,1043.74706 L964.588612,1043.78505 L964.588612,1043.78505 L964.715386,1043.76808 L964.023973,1043.85606 L961.768141,1044.14409 L961.768141,1044.14409 L959.338973,1044.44006 L959.182108,1044.45928 L959.182108,1044.45928 L959.160973,1044.46106 L958.943025,1044.48816 L958.943025,1044.48816 L956.949973,1044.72006 L956.408816,1044.78326 L956.408816,1044.78326 L956.457973,1044.77706 L956.376973,1044.78706 L956.326973,1044.79206 L953.578023,1045.09857 C951.689319,1045.30375 949.797606,1045.49891 947.902939,1045.68396 L947.902292,1045.68423 L947.634973,1045.70906 L939.424973,1046.44206 L939.202973,1046.46006 L930.937876,1047.06482 L930.937876,1047.06482 L930.443973,1047.09506 L922.340973,1047.55406 L922.263973,1047.55806 L922.228973,1047.55906 L922.206973,1047.56006 L913.731973,1047.90406 L913.643973,1047.90706 L913.504973,1047.91206 L913.498973,1047.91206 L905.089973,1048.11606 L904.951205,1048.11956 L896.335913,1048.18894 L887.720688,1048.11956 L887.575973,1048.11606 L879.139973,1047.91106 L879.105023,1047.91103 L879.105023,1047.91103 L879.125973,1047.91106 L879.139973,1047.91106 L879.746973,1047.92906 L879.125973,1047.91106 L879.065973,1047.90906 L878.978036,1047.90692 L878.978036,1047.90692 L879.008973,1047.90706 L879.065973,1047.90906 L879.105023,1047.91103 L879.008973,1047.90706 L878.896973,1047.90306 L870.546973,1047.56506 L870.404224,1047.5586 L870.404224,1047.5586 L870.458985,1047.56126 L867.635147,1047.41641 L867.635147,1047.41641 L867.527973,1047.41006 L867.510058,1047.40965 C866.546027,1047.35739 865.582688,1047.30253 864.62005,1047.24507 L863.487973,1047.17406 L861.999378,1047.08211 L861.999378,1047.08211 L859.134058,1046.88899 L859.134058,1046.88899 L858.918025,1046.87379 L858.918025,1046.87379 L857.659973,1046.78106 L856.272967,1046.68053 L856.272967,1046.68053 L856.123973,1046.66806 L856.105898,1046.66788 C855.169209,1046.59677 854.233207,1046.52321 853.2979,1046.44719 L853.298205,1046.44721 C848.542545,1046.06067 843.805049,1045.61067 839.086389,1045.09804 L836.318973,1044.78906 L836.206973,1044.77606 L828.227973,1043.80306 L827.956973,1043.76806 L828.076973,1043.78406 Z"
                  id="1-and-2-and-3-and-4"
                ></path>
                <path
                  d="M896.341108,525.731025 C960.154116,589.825586 1007.48591,670.34238 1031.44376,760.388674 C988.336806,748.922783 943.050094,742.81106 896.335913,742.81106 C849.621737,742.81106 804.33503,748.922782 761.226998,760.392676 C785.185563,670.342976 832.517473,589.825824 896.330717,525.731025 L896.341108,525.731025 Z"
                  id="1-and-2-and-4"
                ></path>
              </g>
            </svg>
          </aside> */}
        </div>
      </section>
    </>
  );
};

export default Home;
