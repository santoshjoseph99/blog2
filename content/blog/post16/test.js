
/*
a b c d e f
"abc",3,"def",4,"zzd",5
*/

function getData(data) {
  const results1 = [];
  // filter out data
  for(let i = 0; i < data.length; i++) {
    if(data.d1 === "abc") {
      results1.push(data[i]);
    }
  }
  const results2 = [];
  //transform data
  for(let i = 0; i < results1.length; i++) {
    results2.push(...results1, { d2: results1.d2 * 2});;
  }
  return results2;
}

function getData(data) {
   return data.filter(d => d.d1 === 'abc')
              .map(d => {return {...d, d2: d.d2 * 2}});
}

function init(config) {
  //set page variables
  this.pageSize = config.pageSize ? config.pageSize : 10;
  this.maxPages = config.maxPages ? config.maxPages : 1000;
  // set up callbacks
  this.pageChange = config.pageChange;
  this.lastPage = config.lastPage;
  //find preview box limits
  this.leftPageAdvance = null;
  this.rightPageAdvance = null;
  
  this.calcPageLength = this.displayPort / config.lines + 1

  // use only config data points needed
  for(let i = 0; i < config.data.length; i++) {
    if(config.data[i].d1 === "abc") {
      this.dataPoints.push(config.data[i]);
    }
  }
  const results = [];
  //normalize data
  for(let i = 0; i < this.dataPoints.length; i++) {
    results.push(...this.dataPoints, { d2: this.dataPoints.d2 * 2});;
  }
  this.dataPoints = results;
}

function init(config) {
  setPageVariables(config);
  setCallbacks(config);
  findPreviewBoxLimits();
  filterDataPoints(config);
  normalizeData(config);
}