# Project: Proxies as Variable Environments

## Logbook

### Wed Dec 27 10:08:45 PST 2023

When I was writing small scripts, like the ["generate new post" script](https://github.com/reedspool/reeds-website/blob/main/scripts/generate-new-post.tsx#L1) which I used to generate this page, I found I wanted more visibility into what my script was doing. Especially while developing or debugging, I wanted to see every time a variable changed. So I used a [Proxy (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to make a special store for special variables which would print whenever they were retrieved or set.

<pre><code>
// A proxy to store some special variables with some logging tools (off by default)
// Turn logging on by passing `{ level: Infinity }`
// Override the logger by passing in `{ log: MyLog }`. Defaults to `console.log`
// Level 0: Nothing printed
// Level 1: Sets are pretty-printed
// Level 2: Gets are also pretty-printed
// Level 3: Entire variable storage is pretty-printed JSONified after every Set
// Level 4: Ditto also before every Get
const createStore = ({ log = console.log, level = 0 } = {}) => {
return new Proxy(
{},
{
get(target, prop) {
level >= 4 &&
log?.(`Target is now: \${JSON.stringify(target, null, 2)}`);
level >= 2 &&
log?.(`Getting '\${prop.toString()}' value of '\${target[prop]}'`);
return target[prop];
},
set(target, prop, value) {
level >= 1 &&
log?.(`Setting '\${prop.toString()}' to '\${value}'`)
target[prop] = value;
level >= 3 &&
log?.(`Target is now: \${JSON.stringify(target, null, 2)}`)
}
}
)
}

window.createStore = createStore;
</code></pre>

<future->I added a way adjust the level and the logger after creation. I also considered a way to set the initial state of the target (where currently I was using a literal empty object); that way one could just create a brand new store with the old initial value, maybe? I had to think more about it.</future->

<future->I added a demo on this page for this proxy store, where I created a special logger which appended to an HTML element, and then a small form to edit the proxy</future->

I also made a custom, functional logger which could be disabled.

<pre><code>
// A logger with some additional tools to turn it on and off
// Override the internal logger by passing in `{ log: MyLog }`. Defaults to `console.log`
const createFunctionalLogger = ({ log = console.log } = {}) => {
  let state = 'on';
  return {
    on() { state = 'on' },
    off() { state = 'off' }, 
    toggle() { state === 'on' ? off() : on() },
    async preserveState(fn) { 
      const previous = state;
      await fn();
      state = previous;
    },
    log(...args) {
      state === 'on' && log(...args);
    }
  }
}
window.createFunctionalLogger = createFunctionalLogger;
</code></pre>

As a quick example of how to use these together, here's a transcript from a session with them both:

```
const logger = createFunctionalLogger() // Will use `console.log`
store = createStore({ level: 2, log: logger.log })
store.value = 3 // Logs "Setting 'value' to '3'"
logger.off()
store.value = 6 // No log
logger.on()
store.value = 8 // Logs "Setting 'value' to '8'"
```
