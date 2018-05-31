const itHasBehavior = (sharedExampleName, args) => {
  require('./shared_examples/' + sharedExampleName)(args)
}

exports.itHasBehavior = itHasBehavior
