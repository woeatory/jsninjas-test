INSERT INTO
    "Hero" (
        "nickname",
        "realName",
        "originDescription",
        "superpowers",
        "catchPhrase"
    )
VALUES
    (
        'Shadow Blade',
        'test',
        'A warrior who trained in the dark arts from a young age, mastering the art of stealth.',
        'Invisibility, Shadow Manipulation, Master Swordsman',
        'Embrace the shadows.'
    ),
    (
        'Blaze Fury',
        'test',
        'Once a firefighter, now imbued with the power of flames after a freak accident.',
        'Pyrokinesis, Fire Immunity, Flame Flight',
        'Feel the burn!'
    ),
    (
        'Thunder Striker',
        'test',
        'A scientist struck by a bolt of cosmic lightning, gaining control over thunder and electricity.',
        'Electrokinesis, Super Strength, Lightning Speed',
        'Brace yourself for the storm.'
    ),
    (
        'Mystic Sage',
        'test',
        'A scholar from an ancient order who discovered a mystical artifact, unlocking magical abilities.',
        'Telekinesis, Spellcasting, Time Manipulation',
        'Knowledge is power.'
    ),
    (
        'Iron Fist',
        'test',
        'A martial artist who underwent a rigorous training to gain superhuman strength and resilience.',
        'Superhuman Strength, Enhanced Durability, Master Martial Artist',
        'Break through!'
    );

-- Insert mock data into the HeroImage table
INSERT INTO
    "HeroImage" ("heroId", "image")
VALUES
    (
        1,
        decode (
            '89504e470d0a1a0a0000000d4948445200000001000000010806000000',
            'hex'
        )
    ),
    (
        2,
        decode (
            '89504e470d0a1a0a0000000d4948445200000002000000020806000000',
            'hex'
        )
    ),
    (
        3,
        decode (
            '89504e470d0a1a0a0000000d4948445200000003000000030806000000',
            'hex'
        )
    ),
    (
        4,
        decode (
            '89504e470d0a1a0a0000000d4948445200000004000000040806000000',
            'hex'
        )
    ),
    (
        5,
        decode (
            '89504e470d0a1a0a0000000d4948445200000005000000050806000000',
            'hex'
        )
    );