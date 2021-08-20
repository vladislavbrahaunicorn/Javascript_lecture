/* eslint-disable */
const jokeCreateDtoInType = shape({
    name: uu5String(255).isRequired(),
    text: uu5String(4000)
  });

  const jokeListDtoInType = shape({
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
  });

  const jokeGetImageDataDtoInType = shape ({
    image: code().isRequired(),
    contentDisposition: oneOf(["inline", "attachment"])
  });

  const jokeCreateDtoInType = shape ({
    name: string(255).isRequired(),
    text: string(4000),
    image: binary()
  });