 /**
 * @exports
 * @Unique ID
 */

  const formGuid =  () => {
    return generate() + generate() + '-' + generate() + '-' + generate() + '-' +
    generate() + '-' + generate() + generate() + generate();
  }
  
  const generate =  () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  const guid = formGuid();
  
  export default guid;
  