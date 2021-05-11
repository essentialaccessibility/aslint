import { busEvent } from '../constants/events';
import { Bus } from './bus';

describe('Services', () => {

  describe('Bus', () => {

    beforeEach(() => {
      Bus.unsubscribeAll();
    });

    describe('#subscribe', () => {

      it('should subscribe listener on event', () => {

        const spy = jasmine.createSpy('spy');

        Bus.subscribe(busEvent.onValidatorComplete, spy);
        Bus.publish(busEvent.onValidatorComplete);

        expect(spy).toHaveBeenCalled();
      });

      it('should subscribe listener on existing event', () => {

        const spy = jasmine.createSpy('spy'),
          spy2 = jasmine.createSpy('spy2');

        Bus.subscribe(busEvent.onValidatorComplete, spy);
        Bus.subscribe(busEvent.onValidatorComplete, spy2);

        Bus.publish(busEvent.onValidatorComplete);

        expect(spy).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
      });

    });

    describe('#unsubscribe', () => {

      it('should expose an unsubscribe method', () => {
        expect(Bus.unsubscribe).toBeDefined();
        expect(typeof Bus.unsubscribe).toBe('function');
      });

      it('should unsubscribe listener on event', () => {

        const spy = jasmine.createSpy('spy');

        Bus.subscribe(busEvent.onValidatorComplete, spy);
        Bus.unsubscribe(busEvent.onValidatorComplete, spy);
        Bus.publish(busEvent.onValidatorComplete);

        expect(spy).not.toHaveBeenCalled();
      });

      it('should throw exception if trying unsubscribe without event name at least', () => {
        expect(() => {
          // @ts-ignore
          Bus.unsubscribe();
        }).toThrowError('[Bus.unsubscribe] missing event name');
      });

      it('should do nothing if trying to unsubscribe listener from non-existing event', () => {
        expect(() => {
          // @ts-ignore
          Bus.unsubscribe('application.run1');
        }).not.toThrow();
      });

    });

    describe('#subscribeOnce', () => {

      it('should subscribe listener on event, but publish it only once', () => {

        const spy = jasmine.createSpy('spy');

        Bus.subscribeOnce(busEvent.onValidatorComplete, spy);
        Bus.publish(busEvent.onValidatorComplete);
        Bus.publish(busEvent.onValidatorComplete);
        expect(spy.calls.count()).toEqual(1);
      });

    });

    describe('#publish', () => {

      it('should publish event', () => {

        const spy = jasmine.createSpy('spy');

        Bus.subscribe(busEvent.onValidatorComplete, spy);
        Bus.publish(busEvent.onValidatorComplete);
        expect(spy).toHaveBeenCalled();
      });

      it('should throw exception if tried to publish non-existing event', () => {

        const publishNonExistingEvent = (): void => {
          Bus.publish('test');
        };

        expect(publishNonExistingEvent).toThrowError('[Bus.publish] Trying to publish non exists event: test');
      });

    });

  });
});
