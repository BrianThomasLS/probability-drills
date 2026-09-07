local xx = 810;
local yy = 580;
local xx2 = 1050;
local yy2 = 580;
local ofs = 20;
local followchars = true;
local del = 0;
local del2 = 0;



function onCreate()
	-- background shit
	makeLuaSprite('bg', 'office/office', 0, 0);
	scaleObject('bg', 1.1, 1.1);
	addLuaSprite('bg', false);
	
	makeLuaSprite('fg', 'office/lamp-table', 0, 510);
	scaleObject('fg', 1, 1);
	addLuaSprite('fg', true);

	makeAnimatedLuaSprite('crowd', 'office/crowds', -340, 550);
	addAnimationByPrefix('crowd', 'bop', 'Crewmates', 24, true);

	makeAnimatedLuaSprite('speakerlonely', 'characters/speakerlonely', 570, 500);
	addAnimationByPrefix('speakerlonely', 'bop', 'speakers lonely', 24, false);
        addLuaSprite('speakerlonely', false)
        setProperty('speakerlonely.alpha', 0)

        if songName == 'Sabotage' then
              setProperty('speakerlonely.alpha', 1)
        end

        if songName == 'Meltdown' then
              addLuaSprite('crowd', true)
              setProperty('speakerlonely.alpha', 1)
        end

	function onUpdate()
                function onBeatHit()
	                if curBeat % 2 == 0 then
                                  objectPlayAnimation('crowd', 'bop', true)
                                  objectPlayAnimation('speakerlonely', 'bop', true)
                        end
                 end

		if del > 0 then
			del = del - 1
		end
		if del2 > 0 then
			del2 = del2 - 1
		end
		if followchars == true then
			if mustHitSection == false then
				if getProperty('dad.animation.curAnim.name') == 'singLEFT' then
					triggerEvent('Camera Follow Pos',xx-ofs,yy)
				end
				if getProperty('dad.animation.curAnim.name') == 'singRIGHT' then
					triggerEvent('Camera Follow Pos',xx+ofs,yy)
				end
				if getProperty('dad.animation.curAnim.name') == 'singUP' then
					triggerEvent('Camera Follow Pos',xx,yy-ofs)
				end
				if getProperty('dad.animation.curAnim.name') == 'singDOWN' then
					triggerEvent('Camera Follow Pos',xx,yy+ofs)
				end
				if getProperty('dad.animation.curAnim.name') == 'singLEFT-alt' then
					triggerEvent('Camera Follow Pos',xx-ofs,yy)
				end
				if getProperty('dad.animation.curAnim.name') == 'singRIGHT-alt' then
					triggerEvent('Camera Follow Pos',xx+ofs,yy)
				end
				if getProperty('dad.animation.curAnim.name') == 'singUP-alt' then
					triggerEvent('Camera Follow Pos',xx,yy-ofs)
				end
				if getProperty('dad.animation.curAnim.name') == 'singDOWN-alt' then
					triggerEvent('Camera Follow Pos',xx,yy+ofs)
				end
				if getProperty('dad.animation.curAnim.name') == 'idle' then
					triggerEvent('Camera Follow Pos',xx,yy)
				end
				if getProperty('dad.animation.curAnim.name') == 'idle-alt' then
					triggerEvent('Camera Follow Pos',xx,yy)
				end
				if getProperty('dad.animation.curAnim.name') == 'danceRight' then
					triggerEvent('Camera Follow Pos',xx,yy)
				end
			else
	
				if getProperty('boyfriend.animation.curAnim.name') == 'singLEFT' then
					triggerEvent('Camera Follow Pos',xx2-ofs,yy2)
				end
				if getProperty('boyfriend.animation.curAnim.name') == 'singRIGHT' then
					triggerEvent('Camera Follow Pos',xx2+ofs,yy2)
				end
				if getProperty('boyfriend.animation.curAnim.name') == 'singUP' then
					triggerEvent('Camera Follow Pos',xx2,yy2-ofs)
				end
				if getProperty('boyfriend.animation.curAnim.name') == 'singDOWN' then
					triggerEvent('Camera Follow Pos',xx2,yy2+ofs)
				end
			if getProperty('boyfriend.animation.curAnim.name') == 'idle' then
					triggerEvent('Camera Follow Pos',xx2,yy2)
				end
			end
		else
			triggerEvent('Camera Follow Pos','','')
		end
		
	end
end